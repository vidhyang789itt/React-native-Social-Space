import { StyleSheet } from "react-native";
import type { AppTheme } from "../../theme/theme";

export const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: "rgba(0,0,0,0.45)",
      justifyContent: "center",
      alignItems: "center",
      padding: 24,
    },

    modal: {
      width: "100%",
      maxWidth: 420,
      backgroundColor: theme.colors.surface,
      borderRadius: 24,
      padding: 24,
      borderWidth: 1,
      borderColor: theme.colors.border,

      shadowColor: theme.colors.shadow,
      shadowOffset: {
        width: 0,
        height: 12,
      },
      shadowOpacity: theme.mode === "dark" ? 0.35 : 0.15,
      shadowRadius: 24,
      elevation: 10,
    },

    title: {
      fontSize: 22,
      fontWeight: "700",
      color: theme.colors.text,
      marginBottom: 10,
    },

    message: {
      fontSize: 15,
      lineHeight: 24,
      color: theme.colors.textMuted,
      marginBottom: 24,
    },

    buttonGroup: {
      flexDirection: "row",
      gap: 12,
    },

    cancelButton: {
      flex: 1,
      height: 48,
      borderRadius: 14,
      borderWidth: 1,
      borderColor: theme.colors.border,
      backgroundColor: theme.colors.surface,
      justifyContent: "center",
      alignItems: "center",
    },

    cancelButtonText: {
      fontSize: 14,
      fontWeight: "700",
      color: theme.colors.textMuted,
    },

    confirmButton: {
      flex: 1,
      height: 48,
      borderRadius: 14,
      backgroundColor: theme.colors.danger,
      justifyContent: "center",
      alignItems: "center",

      shadowColor: theme.colors.danger,
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.25,
      shadowRadius: 8,
      elevation: 4,
    },

    confirmButtonText: {
      fontSize: 14,
      fontWeight: "700",
      color: theme.colors.primaryText,
      textTransform: "uppercase",
      letterSpacing: 0.5,
    },

    disabledButton: {
      opacity: 0.6,
    },
  });