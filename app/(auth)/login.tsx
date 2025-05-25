import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Image, Text, TouchableOpacity } from "react-native";
import { SvgXml } from 'react-native-svg';

import galaLogo from "@/assets/images/gala_logo.png";
import AuthInput from "@/components/common/AuthInput";
import { useAuthStore } from "@/store/auth";

// Import the SVG content
const locPinSvg = `<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M16 2C11.5817 2 8 5.58172 8 10C8 15.25 16 30 16 30C16 30 24 15.25 24 10C24 5.58172 20.4183 2 16 2ZM16 13C14.3431 13 13 11.6569 13 10C13 8.34315 14.3431 7 16 7C17.6569 7 19 8.34315 19 10C19 11.6569 17.6569 13 16 13Z" fill="#007AFF"/>
</svg>`;

export default function LoginScreen() {
  const router = useRouter();
  const login = useAuthStore((state) => state.login);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setIsLoading(true);
      await login(email, password);
      router.replace("/(root)/home");
    } catch (error) {
      console.error("Login failed:", error);
      // You might want to show an error message to the user here
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LinearGradient
      colors={["#007AFF", "#0E4ECF", "#0E4ECF"]}
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 48,
      }}
    >
      <Image
        source={galaLogo}
        className="w-52 h-52 mb-4"
        resizeMode="contain"
      />

      <AuthInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <AuthInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity className="self-end">
        <Text className="text-white text-xs mb-5 font-bold">
          Forgot Password?
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        className="bg-[#4DA4FF] w-full h-12 rounded-xl justify-center items-center mb-4 shadow overflow-hidden"
        onPress={handleLogin}
        disabled={isLoading}
      >
        <LinearGradient
          colors={["#56B0FF", "#1A89EA"]}
          className="w-full h-full flex-1 justify-center items-center"
        >
          <Text className="text-white font-bold text-sm">
            {isLoading ? "Logging in..." : "Login"}
          </Text>
        </LinearGradient>
      </TouchableOpacity>

      <TouchableOpacity
        className="bg-[#4DA4FF] w-full h-12 rounded-xl justify-center items-center mb-4 shadow overflow-hidden"
        onPress={() => router.push("/signup")}
      >
        <LinearGradient
          colors={["#8FAAF0", "#5D7AD1"]}
          className="w-full h-full flex-1 justify-center items-center"
        >
          <Text className="text-white font-bold text-sm">Sign Up</Text>
        </LinearGradient>
      </TouchableOpacity>

      <Text className="text-white text-xs mb-5">
        ──────── or Login with ────────
      </Text>

      <TouchableOpacity className="flex bg-white w-32 h-16 p-3 rounded-xl shadow justify-center items-center">
        <SvgXml xml={locPinSvg} width={32} height={32} />
      </TouchableOpacity>
    </LinearGradient>
  );
}
