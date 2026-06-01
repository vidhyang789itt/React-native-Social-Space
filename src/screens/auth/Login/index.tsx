import React, { useEffect, useState } from "react";
import { View, ActivityIndicator, StatusBar } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { createStyles } from "../styles";
import { useAppTheme } from "../../../theme/ThemeContext";
import { useLogin } from "../useLogin";
import { RootStackParamList } from "../../../types/RootStackParamList";
import { getToken } from "../../../utils/AsyncStorage";
import { AuthForm } from "../../../components/auth/AuthForm";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const LoginScreen = () => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    loading,
    error,
    handleLogin,
  } = useLogin();

  const navigation = useNavigation<NavigationProp>();
  const { theme } = useAppTheme();
  const styles = createStyles(theme);

  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = await getToken();
        if (token) {
          navigation.replace("Home");
          return;
        }
      } catch (error) {
        console.log(error);
      } finally {
        setCheckingAuth(false);
      }
    };
    checkAuth();
  }, []);

  if (checkingAuth) {
    return (
      <View style={styles.loaderContainer}>
        <StatusBar barStyle={theme.mode === "dark" ? "light-content" : "dark-content"} backgroundColor="transparent" translucent />
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  return (
    <AuthForm
      title="Where Stories Come Alive ✨"
      subtitle="Connect, share, and inspire the world around you."
      buttonLabel="Login"
      loading={loading}
      error={error}
      inputs={[
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
          placeholder: "Enter your password",
          value: password,
          onChangeText: setPassword,
          secureTextEntry: true,
          editable: !loading,
        },
      ]}
      onSubmit={handleLogin}
      redirectText="Don’t have an account?"
      redirectLinkLabel="Register"
      onRedirectPress={() => navigation.navigate("Register")}
    />
  );
};

export default LoginScreen;
