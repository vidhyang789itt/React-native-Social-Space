

import { StyleSheet } from "react-native";
import type { AppTheme } from "../../../theme/theme";

export const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      paddingHorizontal: 16,
      paddingBottom: 16,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },

    commentsText: {
      color: theme.colors.textMuted,
      fontSize: 13,
      fontWeight: "500",
    },

    detailsText: {
      color: theme.colors.primary,
      fontSize: 13,
      fontWeight: "700",
    },
  });
