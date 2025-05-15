import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";

import galaLogo from "@/assets/images/gala_logo.png";
import AuthInput from "@/components/common/AuthInput";

export default function SignupScreen() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

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
      <AuthInput placeholder="E-mail" value={email} onChangeText={setEmail} />
      <AuthInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <AuthInput
        placeholder="Confirm Password"
        secureTextEntry
        value={password2}
        onChangeText={setPassword2}
      />

      <TouchableOpacity
        className="bg-[#4DA4FF] w-full h-12 rounded-xl justify-center items-center mt-2 mb-4 shadow overflow-hidden"
        onPress={() => {
          console.log("Signup Details:", username, email, password, password2);
        }}
      >
        <LinearGradient
          colors={["#8FAAF0", "#5D7AD1"]}
          className="w-full h-full flex-1 justify-center items-center"
        >
          <Text className="text-white font-bold text-sm">Sign Up</Text>
        </LinearGradient>
      </TouchableOpacity>

      <View className="flex-row justify-center mb-5">
        <Text className="text-white text-sm font-bold">
          Already have an account?{" "}
        </Text>
        <TouchableOpacity onPress={() => router.push("/(auth)/login")}>
          <Text className="text-white text-sm font-bold underline">Log in</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}
