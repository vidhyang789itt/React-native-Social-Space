

import { StyleSheet } from "react-native";
import type { AppTheme } from "../../../theme/theme";

export const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 16,
      paddingVertical: 14,
    },

    actionBtn: {
      flexDirection: "row",
      alignItems: "center",
      marginRight: 18,
    },

    actionText: {
      color: theme.colors.textMuted,
      fontSize: 14,
      fontWeight: "600",
      marginLeft: 6,
    },
  });
