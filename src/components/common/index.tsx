import React from "react";
import {
  View,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { createStyles } from "./style";
import { useAppTheme } from "../../theme/ThemeContext";

export default function Loader() {
  const { theme } = useAppTheme(); 
  const styles = createStyles(theme);
  return (
    <View style={styles.container}>
      <ActivityIndicator
        size="large"
        color="#8B5CF6"
      />
    </View>
  );
}
