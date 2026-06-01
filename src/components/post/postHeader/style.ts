import { StyleSheet } from "react-native";
import type { AppTheme } from "../../../theme/theme";

export const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      paddingHorizontal: 16,
      paddingTop: 16,
      paddingBottom: 12,
    },

    userRow: {
      flexDirection: "row",
      alignItems: "center",
    },

    avatar: {
      width: 48,
      height: 48,
      borderRadius: 24,
      marginRight: 12,
      backgroundColor: theme.colors.surfaceSoft,
    },

    username: {
      color: theme.colors.text,
      fontSize: 15,
      fontWeight: "700",
    },

    time: {
      color: theme.colors.textMuted,
      fontSize: 12,
      marginTop: 2,
    },
  });
