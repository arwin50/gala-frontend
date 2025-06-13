import { PutObjectCommand, S3Client, S3ServiceException } from "@aws-sdk/client-s3";
import Constants from "expo-constants";
import 'react-native-get-random-values';

// Create a singleton S3 client
const s3Client = new S3Client({
    region: Constants.expoConfig?.extra?.awsRegion,
    credentials: {
        accessKeyId: Constants.expoConfig?.extra?.awsAccessKeyId,
        secretAccessKey: Constants.expoConfig?.extra?.awsSecretAccessKey,
    },
});

/**
 * Sanitizes a filename by removing special characters and spaces
 */
const sanitizeFileName = (fileName: string): string => {
    return fileName
        .replace(/[^a-zA-Z0-9.-]/g, '_')
        .replace(/_+/g, '_')
        .toLowerCase();
};

/**
 * Sanitizes a directory path by removing special characters and ensuring proper format
 */
const sanitizeDirectoryPath = (path: string): string => {
    return path
        .replace(/^\/+|\/+$/g, '') // Remove leading and trailing slashes
        .replace(/\/+/g, '/') // Replace multiple slashes with single slash
        .replace(/[^a-zA-Z0-9\/.-]/g, '_') // Replace special chars with underscore
        .toLowerCase();
};

/**
 * Uploads a file to S3 and returns the public URL
 * @param file The file to upload (FormData or File object)
 * @param directoryPath Optional directory path within the bucket (e.g., 'users/avatars', 'events/covers')
 * @returns Promise<string> The public URL of the uploaded file
 * @throws Error if the upload fails
 */
export const uploadFileToS3 = async (file: FormData | File, directoryPath?: string): Promise<string> => {
    try {
        let fileName: string;
        let contentType: string;
        let fileData: Uint8Array;

        if (file instanceof FormData) {
            const fileInfo = file.get('file') as any;
            fileName = fileInfo.name;
            contentType = fileInfo.type || 'application/octet-stream';
            
            // Read the file from the URI
            const response = await fetch(fileInfo.uri);
            const arrayBuffer = await response.arrayBuffer();
            fileData = new Uint8Array(arrayBuffer);
        } else {
            fileName = file.name;
            contentType = file.type || 'application/octet-stream';
            const arrayBuffer = await file.arrayBuffer();
            fileData = new Uint8Array(arrayBuffer);
        }

        const sanitizedFileName = sanitizeFileName(fileName);

        // Construct the full key with directory path if provided
        const key = directoryPath 
            ? `${sanitizeDirectoryPath(directoryPath)}/${sanitizedFileName}`
            : sanitizedFileName;

        const command = new PutObjectCommand({
            Bucket: Constants.expoConfig?.extra?.awsBucketName,
            Key: key,
            Body: fileData,
            ContentType: contentType,
        });

        await s3Client.send(command);
        
        return `https://${Constants.expoConfig?.extra?.awsBucketName}.s3.${Constants.expoConfig?.extra?.awsRegion}.amazonaws.com/${key}`;
    } catch (error) {
        if (error instanceof S3ServiceException) {
            console.error('S3 Service Error:', {
                code: error.$metadata?.httpStatusCode,
                message: error.message,
                requestId: error.$metadata?.requestId,
            });
            throw new Error(`S3 upload failed: ${error.message}`);
        }
        
        console.error('Error uploading file to S3:', error);
        throw new Error('Failed to upload file to S3');
    }
}
