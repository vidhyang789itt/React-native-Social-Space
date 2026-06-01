import { StyleSheet } from "react-native";
import type { AppTheme } from "../../../theme/theme";

export const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      height: 76,
      paddingHorizontal: 16,
      backgroundColor: theme.colors.surface,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    sideBtn: {
      width: 42,
      height: 42,
      borderRadius: 21,
      alignItems: "center",
      justifyContent: "center",
    },
    centerSection: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
    },
    logo: {
      width: 38,
      height: 38,
      borderRadius: 19,
    },
    appName: {
      fontSize: 24,
      fontWeight: "800",
      color: theme.colors.text,
    },
    modalOverlay: {
      flex: 1,
      backgroundColor:
        theme.mode === "dark"
          ? "rgba(0, 0, 0, 0.55)"
          : "rgba(15, 23, 42, 0.18)",
      paddingTop: 80,
      paddingHorizontal: 14,
    },
    settingsCard: {
      width: 260,
      backgroundColor: theme.colors.surface,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: theme.colors.border,
      padding: 14,
      shadowColor: theme.colors.shadow,
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: theme.mode === "dark" ? 0.35 : 0.15,
      shadowRadius: 18,
      elevation: 12,
    },
    settingsHeader: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 12,
    },
    settingsTitle: {
      fontSize: 16,
      fontWeight: "800",
      color: theme.colors.text,
    },
    closeBtn: {
      width: 30,
      height: 30,
      borderRadius: 15,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: theme.colors.surfaceSoft,
    },
    settingRow: {
      paddingVertical: 10,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 12,
    },
    settingLeft: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
    },
    settingIconWrap: {
      width: 36,
      height: 36,
      borderRadius: 18,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: theme.colors.primarySoft,
    },
    settingLabel: {
      fontSize: 14,
      fontWeight: "800",
      color: theme.colors.text,
    },
    settingDescription: {
      marginTop: 2,
      fontSize: 11,
      fontWeight: "600",
      color: theme.colors.textMuted,
    },
    badge: {
      position: "absolute",
      top: 4,
      right: 4,
      backgroundColor: theme.colors.danger,
      borderRadius: 9,
      minWidth: 18,
      height: 18,
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: 4,
      borderWidth: 1.5,
      borderColor: theme.colors.surface,
    },
    badgeText: {
      color: "#ffffff",
      fontSize: 8.5,
      fontWeight: "800",
      textAlign: "center",
    },
  });
