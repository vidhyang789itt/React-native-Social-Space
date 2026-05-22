import { StyleSheet } from "react-native";
import type { AppTheme } from "../../../theme/theme";

export const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      paddingHorizontal: 18,
      paddingTop: 20,
      paddingBottom: 14,
      backgroundColor: theme.colors.background,
    },

    title: {
      fontSize: 28,
      fontWeight: "800",
      color: theme.colors.text,
    },

    subtitle: {
      marginTop: 6,
      fontSize: 14,
      color: theme.colors.textMuted,
    },
  });
