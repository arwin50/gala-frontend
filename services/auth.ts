import { axiosPublic } from "@/lib/axios";
import AsyncStorage from "@react-native-async-storage/async-storage";


export const login = async (email: string, password: string) => {
    try {
        const response = await axiosPublic.post("/user/login/", {
            email,
            password,
        });

        const { access, refresh } = response.data;

        await AsyncStorage.setItem("access_token", access);
        await AsyncStorage.setItem("refresh_token", refresh);

        return response.data;
    } catch (error) {
        console.error("Login failed:", error);        
        throw error;
    }
}

export const register = async (email: string, password1: string, password2: string, first_name: string, last_name: string) => {
    try {
        const response = await axiosPublic.post("/user/registration/", {
            email,
            password1,
            password2,
            first_name,
            last_name,
        });

        return response.data;
    } catch (error) {
        console.error("Registration failed:", error);
        throw error;
    }
}
