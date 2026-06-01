import React, { useRef, useEffect } from "react";
import {
  Animated,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { createStyles } from "../styles";
import { useAppTheme } from "../../../theme/ThemeContext";
import { useLogin } from "../useLogin";
import { RootStackParamList } from "../../../types/RootStackParamList";
import { AuthForm } from "../../../components/auth/AuthForm";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const RegisterScreen = () => {
  const {
    userName,
    setUserName,
    email,
    setEmail,
    password,
    setPassword,
    loading,
    error,
    handleRegister,
  } = useLogin();

  const navigation = useNavigation<NavigationProp>();
  const { theme } = useAppTheme();
  const styles = createStyles(theme);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(40)).current;
  const scaleAnim = useRef(new Animated.Value(0.96)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        tension: 45,
        friction: 8,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 40,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, slideAnim, scaleAnim]);

  return (
    <AuthForm
      title="Start Your Story Today ✨"
      subtitle="Join a community where every moment matters."
      buttonLabel="Create Account"
      loading={loading}
      error={error}
      inputs={[
        {
          label: "Username",
          placeholder: "Create your username",
          value: userName,
          onChangeText: setUserName,
          editable: !loading,
        },
        {
          label: "Email",
          placeholder: "Enter your email",
          value: email,
          onChangeText: setEmail,
          keyboardType: "email-address",
          editable: !loading,
        },
        {
          label: "Password",
          placeholder: "Create a password",
          value: password,
          onChangeText: setPassword,
          secureTextEntry: true,
          editable: !loading,
        },
      ]}
      redirectText="Already have an account?"
      redirectLinkLabel="Login"
      onRedirectPress={() => navigation.navigate("Login")}
      onSubmit={handleRegister}
    />
  );
};

export default RegisterScreen;