import { PutObjectCommand, S3Client, S3ServiceException } from "@aws-sdk/client-s3";

// Validate required environment variables
const requiredEnvVars = ['AWS_REGION', 'AWS_ACCESS_KEY_ID', 'AWS_SECRET_ACCESS_KEY', 'AWS_BUCKET_NAME'] as const;
for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
        throw new Error(`Missing required environment variable: ${envVar}`);
    }
}

// Create a singleton S3 client
const s3Client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
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
 * @param file The file to upload
 * @param directoryPath Optional directory path within the bucket (e.g., 'users/avatars', 'events/covers')
 * @returns Promise<string> The public URL of the uploaded file
 * @throws Error if the upload fails
 */
export const uploadFileToS3 = async (file: File, directoryPath?: string): Promise<string> => {
    try {
        const sanitizedFileName = sanitizeFileName(file.name);
        const contentType = file.type || 'application/octet-stream';

        // Convert File to ArrayBuffer
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // Construct the full key with directory path if provided
        const key = directoryPath 
            ? `${sanitizeDirectoryPath(directoryPath)}/${sanitizedFileName}`
            : sanitizedFileName;

        const command = new PutObjectCommand({
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: key,
            Body: buffer,
            ContentType: contentType,
        });

        await s3Client.send(command);
        
        return `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
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
