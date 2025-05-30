export default {
  expo: {
    // ... other expo config
    extra: {
      googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
      backendUrl: process.env.BACKEND_URL,
    },
  },
};
