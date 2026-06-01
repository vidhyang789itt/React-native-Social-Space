import { StyleSheet } from "react-native";
import type { AppTheme } from "../../../theme/theme";

export const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 8,
      paddingVertical: 8,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
      backgroundColor: theme.colors.surface,
    },
    backButton: {
      width: 34,
      height: 40,
      alignItems: "center",
      justifyContent: "center",
      marginRight: 2,
    },
    userInfoContainer: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
    },
    avatarWrapper: {
      position: "relative",
      width: 42,
      height: 42,
    },
    avatar: {
      width: "100%",
      height: "100%",
      borderRadius: 21,
      borderColor: "transparent",
      borderWidth: 2,
      backgroundColor: theme.colors.surfaceSoft,
    },
    onlineIndicator: {
      position: "absolute",
      bottom: 2,
      right: 2,
      width: 10,
      height: 10,
      borderRadius: 5,
      backgroundColor: theme.colors.success,
      borderWidth: 2,
      borderColor: theme.colors.surface,
    },
    textContainer: {
      flex: 1,
      minWidth: 0,
    },
    nameText: {
      fontSize: 16,
      fontWeight: "700",
      lineHeight: 20,
      color: theme.colors.text,
    },
    statusText: {
      fontSize: 12,
      fontWeight: "600",
      marginTop: 2,
    },
    settingsButton: {
      width: 40,
      height: 40,
      justifyContent: "center",
      alignItems: "center",
      marginLeft: 6,
    },
  });
