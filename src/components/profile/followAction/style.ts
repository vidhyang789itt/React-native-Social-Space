

import { StyleSheet } from "react-native";
import type { AppTheme } from "../../../theme/theme";

export const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    button: {
      minWidth: 96,
      height: 36,
      borderRadius: 12,
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: 18,
    },

    followButton: {
      backgroundColor: theme.colors.primary,

      shadowColor: theme.colors.primary,
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowOpacity: theme.mode === "dark" ? 0.28 : 0.18,
      shadowRadius: 6,
      elevation: 4,
    },

    followingButton: {
      backgroundColor: theme.colors.surface,
      borderWidth: 1,
      borderColor: theme.colors.primarySoft,
    },

    buttonText: {
      color: theme.colors.primaryText,
      fontSize: 13,
      fontWeight: "700",
      letterSpacing: 0.3,
    },

    followingButtonText: {
      color: theme.colors.primary,
    },
  });