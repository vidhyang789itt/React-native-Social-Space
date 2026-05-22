import { StyleSheet } from "react-native";
import type { AppTheme } from "../../../theme/theme";

export const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      flexDirection: "row",
      backgroundColor: theme.colors.surface,
      paddingHorizontal: 16,
      paddingVertical: 16,
      borderTopWidth: 1,
      borderTopColor: theme.colors.border,
    },

    cancelBtn: {
      flex: 1,
      height: 54,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 16,
      backgroundColor: theme.colors.surfaceSoft,
      marginRight: 10,
    },

    cancelText: {
      color: theme.colors.text,
      fontSize: 15,
      fontWeight: "700",
    },

    submitBtn: {
      flex: 1,
      height: 54,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 16,
      backgroundColor: theme.colors.primary,
    },

    submitText: {
      color: theme.colors.primaryText,
      fontSize: 15,
      fontWeight: "700",
    },
  });
