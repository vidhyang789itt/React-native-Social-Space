import { StyleSheet } from "react-native";
import type { AppTheme } from "../../../theme/theme";

export const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    card: {
      backgroundColor: theme.colors.card,
      borderRadius: 16,
      paddingHorizontal: 12,
      paddingVertical: 10,
      borderWidth: 1,
      borderColor: theme.colors.border,
      flexDirection: "row",
      alignItems: "center",

      shadowColor: theme.colors.shadow,
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowOpacity: theme.mode === "dark" ? 0.12 : 0.04,
      shadowRadius: 8,
      elevation: 1,
    },

    avatarWrapper: {
      width: 50,
      height: 50,
      borderRadius: 25,
      padding: 2,
      backgroundColor: theme.colors.primarySoft,
      marginRight: 10,
    },

    avatar: {
      width: "100%",
      height: "100%",
      borderRadius: 23,
      backgroundColor: theme.colors.surfaceSoft,
    },

    userInfo: {
      flex: 1,
      minWidth: 0,
      paddingRight: 10,
    },

    username: {
      fontSize: 15,
      fontWeight: "800",
      color: theme.colors.text,
    },

    secondaryText: {
      marginTop: 4,
      fontSize: 12,
      color: theme.colors.textMuted,
      fontWeight: "600",
    },

    boldText: {
      color: theme.colors.text,
      fontWeight: "800",
    },

    actionWrap: {
      alignItems: "flex-end",
      justifyContent: "center",
    },
  });