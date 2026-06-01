import { StyleSheet } from "react-native";
import type { AppTheme } from "../../theme/theme";

export const createStyles = (_theme: AppTheme) =>
  StyleSheet.create({
    container: {
      justifyContent: "center",
      backgroundColor: _theme.colors.background,
      alignItems: "center",
      minHeight: 800,
    },
  });