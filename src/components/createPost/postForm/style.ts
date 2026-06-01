import { StyleSheet } from "react-native";
import type { AppTheme } from "../../../theme/theme";

export const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },

    scrollContent: {
      paddingHorizontal: 16,
      paddingBottom: 140,
    },
  });
