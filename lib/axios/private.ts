import { memoizedRefreshAccessToken } from "@/utils/jwt";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Constants from "expo-constants";

const backendUrl = Constants.expoConfig?.extra?.backendUrl;

const axiosPrivate = axios.create({
    baseURL: backendUrl,
    headers: {
      "Content-Type": "application/json",
    },
  });
  
  axiosPrivate.interceptors.request.use(async (config) => {
    const accessToken = await AsyncStorage.getItem("access_token");
  
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
  
    return config;
  }, (error) => {
    return Promise.reject(error);
  });
  
  axiosPrivate.interceptors.response.use((response) => response, async (error) => {
      const config = error.config;
  
      if (error.response.status === 401 && !config.sent) {
          config.sent = true;
  
          const newAccessToken = await memoizedRefreshAccessToken();
  
          if (newAccessToken) {
              config.headers.Authorization = `Bearer ${newAccessToken}`;
              return axiosPrivate(config);
          }
  
          return Promise.reject(error);
      }
    }
  );
  
  export { axiosPrivate };
  