export default {
  expo: {
    // ... other expo config
    extra: {
      googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
      backendUrl: process.env.BACKEND_URL,
      awsRegion: process.env.AWS_REGION,
      awsAccessKeyId: process.env.AWS_ACCESS_KEY_ID,
      awsSecretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      awsBucketName: process.env.AWS_BUCKET_NAME,
    },
  },
};
