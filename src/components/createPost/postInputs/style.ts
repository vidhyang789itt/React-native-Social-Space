

import { StyleSheet } from "react-native";
import type { AppTheme } from "../../../theme/theme";

export const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    group: {
      marginBottom: 22,
    },

    label: {
      color: theme.colors.text,
      fontSize: 15,
      fontWeight: "700",
      marginBottom: 10,
    },

    input: {
      backgroundColor: theme.colors.surface,
      borderRadius: 16,
      paddingHorizontal: 16,
      height: 56,
      borderWidth: 1,
      borderColor: theme.colors.border,
      fontSize: 15,
      color: theme.colors.text,
    },

    textArea: {
      backgroundColor: theme.colors.surface,
      borderRadius: 18,
      paddingHorizontal: 16,
      paddingTop: 16,
      minHeight: 180,
      borderWidth: 1,
      borderColor: theme.colors.border,
      fontSize: 15,
      color: theme.colors.text,
      lineHeight: 24,
      textAlignVertical: "top",
    },

    count: {
      alignSelf: "flex-end",
      marginTop: 8,
      color: theme.colors.textSoft,
      fontSize: 12,
    },

    error: {
      color: theme.colors.danger,
      fontSize: 14,
      fontWeight: "600",
    },
  });
