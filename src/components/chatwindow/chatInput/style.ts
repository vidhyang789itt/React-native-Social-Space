import { StyleSheet } from "react-native";
import type { AppTheme } from "../../../theme/theme";

export const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    keyboardAvoidingView: {
      width: "100%",
      flexShrink: 0,
      backgroundColor: theme.colors.surface,
    },

    inputContainer: {
      flexDirection: "row",
      alignItems: "flex-end",
      paddingHorizontal: 12,
      paddingVertical: 12,
      backgroundColor: theme.colors.surface,
      borderTopWidth: 1,
      borderTopColor: theme.colors.border,
      gap: 8,
    },

    textInput: {
      flex: 1,
      backgroundColor: theme.colors.surface,
      borderRadius: 22,
      borderWidth: 2,
      borderColor: theme.mode === "dark" ? theme.colors.border : "#f1eafe",
      paddingHorizontal: 14,
      paddingVertical: 9,
      color: theme.colors.text,
      fontSize: 14,
      maxHeight: 100,
    },

    buttonWrapper: {
      justifyContent: "center",
      alignItems: "center",
    },

    iconButton: {
      width: 36,
      height: 36,
      borderRadius: 8,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "transparent",
    },

    iconButtonDisabled: {
      opacity: 0.5,
    },

    textInputDisabled: {
      opacity: 0.6,
      backgroundColor: theme.colors.surfaceSoft,
    },
  });
