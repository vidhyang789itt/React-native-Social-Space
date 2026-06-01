import { StyleSheet } from "react-native";
import type { AppTheme } from "../../../theme/theme";

export const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      paddingHorizontal: 16,
      paddingBottom: 14,
    },

    title: {
      color: theme.colors.text,
      fontSize: 17,
      fontWeight: "700",
      marginBottom: 8,
    },

    content: {
      color: theme.colors.textMuted,
      fontSize: 14,
      lineHeight: 22,
    },
  });
