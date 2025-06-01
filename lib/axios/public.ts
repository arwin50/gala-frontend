import axios from "axios";
import Constants from "expo-constants";

const backendUrl = Constants.expoConfig?.extra?.backendUrl;

export const axiosPublic = axios.create({
  baseURL: backendUrl,
  headers: {
    "Content-Type": "application/json",
  },
});
