import React from "react";
import { StatusBar } from "react-native";
import {
  SafeAreaProvider,
  SafeAreaView,
} from "react-native-safe-area-context";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StyleSheet } from "react-native";
import type { AppTheme } from "./src/theme/theme";
import { store } from "./src/store/store";
import AppNavigator from "./src/navigation/AppNavigator";
import SocketInitializer from "./src/components/socket/SocketInitializer";

import {
  AppThemeProvider,
  useAppTheme,
} from "./src/theme/ThemeContext";

function AppContent() {
  const { theme } = useAppTheme();
  const styles = createStyles(theme);

  return (
    <>
      <NavigationContainer>
        <SafeAreaView style={styles.container}>
          <SocketInitializer />

          <StatusBar
            barStyle={
              theme.mode === "dark"
                ? "light-content"
                : "dark-content"
            }
            backgroundColor={theme.colors.background}
          />

          <AppNavigator />
        </SafeAreaView>
      </NavigationContainer>
    </>
  );
}

function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <AppThemeProvider>
          <SafeAreaProvider>
            <AppContent />
          </SafeAreaProvider>
        </AppThemeProvider>
      </Provider>
    </GestureHandlerRootView>
  );
}

export const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
  });

export default App;