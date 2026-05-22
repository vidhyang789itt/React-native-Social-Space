import { StyleSheet } from "react-native";
import type { AppTheme } from "../../../theme/theme";

export const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    modalOverlay: {
      flex: 1,
      backgroundColor:
        theme.mode === "dark"
          ? "rgba(0, 0, 0, 0.45)"
          : "rgba(15, 23, 42, 0.08)",
      justifyContent: "center",
      paddingHorizontal: 18,
    },

    dropdownMenu: {
      position: "absolute",
      backgroundColor: theme.colors.surface,
      borderRadius: 14,
      shadowColor: theme.colors.shadow,
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: theme.mode === "dark" ? 0.35 : 0.18,
      shadowRadius: 18,
      elevation: 12,
      minWidth: 210,
      overflow: "hidden",
      borderWidth: 1,
      borderColor: theme.colors.border,
    },

    dropdownMenuLeft: {
      left: 18,
    },

    dropdownMenuRight: {
      right: 18,
    },

    actionButtonActive: {
      backgroundColor: theme.colors.primarySoft,
    },

    dotsText: {
      fontSize: 20,
      fontWeight: "700",
      color: theme.colors.textMuted,
    },

    menuItem: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 14,
      paddingVertical: 12,
      backgroundColor: theme.colors.surface,
    },

    menuItemText: {
      fontSize: 14,
      fontWeight: "600",
      color: theme.colors.text,
    },

    menuDivider: {
      height: 1,
      backgroundColor: theme.colors.border,
    },

    actionContainer: {
      position: "relative",
      justifyContent: "center",
      alignItems: "center",
    },

    actionButton: {
      width: 32,
      height: 32,
      borderRadius: 6,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "transparent",
    },

    dropdownMenuMe: {
      right: 0,
    },

    menuItemDanger: {
      backgroundColor: theme.mode === "dark" ? "#451a1a" : "#fef2f2",
    },

    menuItemTextDanger: {
      fontSize: 14,
      fontWeight: "500",
      color: theme.mode === "dark" ? "#f87171" : "#dc2626",
    },

    menuItemDisabled: {
      opacity: 0.6,
      backgroundColor: theme.colors.surfaceSoft,
    },

    menuItemTextDisabled: {
      fontSize: 14,
      fontWeight: "500",
      color: theme.colors.textSoft,
    },

    timeRemaining: {
      fontSize: 11,
      color: theme.colors.textSoft,
      marginTop: 2,
    },
  });
