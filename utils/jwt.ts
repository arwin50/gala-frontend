import { axiosPublic } from "@/lib/axios/public";
import AsyncStorage from "@react-native-async-storage/async-storage";
import mem from "mem";

const refreshAccessToken = async () => {
    try {
        const refreshToken = await AsyncStorage.getItem("refresh_token");

        if (!refreshToken) {
            console.error("No refresh token found");
            await AsyncStorage.removeItem("access_token");
            return null;
        }

        const response = await axiosPublic.post("/user/token/refresh/", {
            refresh: refreshToken,
        });

        const { access } = response.data;

        if (!access) {
            console.error("No access token received");
            await AsyncStorage.removeItem("refresh_token");
            await AsyncStorage.removeItem("access_token");
            return null;
        }

        await AsyncStorage.setItem("access_token", access);
        return access;
    } catch (error) {
        console.error("Failed to refresh access token:", error);
        await AsyncStorage.removeItem("refresh_token");
        await AsyncStorage.removeItem("access_token");
    }
}

const maxAge = 10000

export const memoizedRefreshAccessToken = mem(refreshAccessToken, { maxAge });
