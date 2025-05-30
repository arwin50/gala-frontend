import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import galaLogo from "@/assets/images/gala_logo.png";
import AuthInput from "@/components/common/AuthInput";
import { register } from "@/services/auth";
import { AxiosError } from "axios";

export default function SignupScreen() {
  const router = useRouter();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const handleSignup = async () => {
    if (!firstName || !lastName || !email || !password || !password2) {
      Alert.alert("Error", "Please fill in all required fields");
      return;
    }

    if (password !== password2) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    try {
      await register(
        email,
        password,
        password2,
        firstName,
        lastName,
      );

      router.push("/(auth)/login");
    } catch (error: any) {
      console.log("Registration error:", error, error?.response?.data);

      if (error instanceof AxiosError && error.response?.status === 400 && error.response?.data?.email) {
        Alert.alert(`${error.response?.data?.email}`);
      } else {
        Alert.alert("An error occurred during registration, please try again.");
      }
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={0}
    >
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
        }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
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
            placeholder="First Name"
            value={firstName}
            onChangeText={setFirstName}
          />
          <AuthInput
            placeholder="Last Name"
            value={lastName}
            onChangeText={setLastName}
          />
          <AuthInput
            placeholder="E-mail"
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
          <AuthInput
            placeholder="Confirm Password"
            secureTextEntry
            value={password2}
            onChangeText={setPassword2}
          />

          <TouchableOpacity
            className="bg-[#4DA4FF] w-full h-12 rounded-xl justify-center items-center mt-2 mb-4 shadow overflow-hidden"
            onPress={handleSignup}
            // disabled={isLoading}
          >
            <LinearGradient
              colors={["#8FAAF0", "#5D7AD1"]}
              className="w-full h-full flex-1 justify-center items-center"
            >
              <Text className="text-white font-bold text-sm">
                {/* {isLoading ? "Signing up..." : "Sign Up"} */}
                Sign Up
              </Text>
            </LinearGradient>
          </TouchableOpacity>

          <View className="flex-row justify-center mb-5">
            <Text className="text-white text-sm font-bold">
              Already have an account?{" "}
            </Text>
            <TouchableOpacity onPress={() => router.push("/(auth)/login")}>
              <Text className="text-white text-sm font-bold underline">
                Log in
              </Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
