import { StyleSheet } from "react-native";
import type { AppTheme } from "../../../theme/theme";

export const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: "rgba(0,0,0,0.5)",
      justifyContent: "center",
      padding: 20,
    },

    modalContainer: {
      backgroundColor: theme.colors.surface,
      borderRadius: 20,
      padding: 25,

      shadowColor: theme.colors.shadow,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: theme.mode === "dark" ? 0.35 : 0.25,
      shadowRadius: 4,
      elevation: 5,
    },

    title: {
      fontSize: 20,
      fontWeight: "bold",
      marginBottom: 20,
      color: theme.colors.text,
      textAlign: "center",
    },

    inputGroup: {
      marginBottom: 15,
    },

    label: {
      fontSize: 14,
      color: theme.colors.textMuted,
      marginBottom: 5,
      fontWeight: "600",
    },

    input: {
      borderWidth: 1,
      borderColor: theme.colors.border,
      borderRadius: 10,
      padding: 12,
      fontSize: 16,
      color: theme.colors.text,
      backgroundColor: theme.colors.inputBackground,
    },

    buttonRow: {
      flexDirection: "row",
      justifyContent: "flex-end",
      gap: 12,
      marginTop: 10,
    },

    saveBtn: {
      backgroundColor: theme.colors.primary,
      paddingHorizontal: 20,
      paddingVertical: 12,
      borderRadius: 10,
    },

    saveBtnText: {
      color: theme.colors.primaryText,
      fontWeight: "bold",
    },

    cancelBtn: {
      paddingHorizontal: 20,
      paddingVertical: 12,
    },

    cancelBtnText: {
      color: theme.colors.textMuted,
      fontWeight: "600",
    },

    errorText: {
      color: theme.colors.danger,
      marginBottom: 15,
      textAlign: "center",
      fontSize: 14,
    },
  });