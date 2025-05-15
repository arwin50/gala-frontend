import React, { useState } from "react";
import { Text, TouchableOpacity, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";

import galaLogo from "@/assets/images/gala_logo.png";
import googleLogo from "@/assets/images/google_logo.svg";
import AuthInput from "@/components/common/AuthInput";

export default function LoginScreen() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <LinearGradient
      colors={["#007AFF", "#0E4ECF", "#0E4ECF"]}
      className="flex-1 justify-center items-center px-12"
    >
      <Image
        source={galaLogo}
        className="w-52 h-52 mb-4"
        resizeMode="contain"
      />

      <AuthInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
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
        onPress={() => {
          console.log("Username/Password:", username, password);
        }}
      >
        <LinearGradient
          colors={["#56B0FF", "#1A89EA"]}
          className="w-full h-full flex-1 justify-center items-center"
        >
          <Text className="text-white font-bold text-sm">Login</Text>
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
        <Image source={googleLogo} className="w-8 h-8" resizeMode="contain" />
      </TouchableOpacity>
    </LinearGradient>
  );
}
