import { StyleSheet } from "react-native";
import type { AppTheme } from "../../../theme/theme";

export const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    wrapper: {
      paddingHorizontal: 14,
      paddingTop: 14,
    },

    header: {
      fontSize: 15,
      fontWeight: "800",
      color: theme.colors.text,
      marginBottom: 12,
      paddingHorizontal: 4,
    },

    listContainer: {
      gap: 10,
      paddingBottom: 16,
    },

    emptyContainer: {
      backgroundColor: theme.colors.surface,
      borderRadius: 18,
      paddingVertical: 36,
      paddingHorizontal: 22,
      alignItems: "center",
      borderWidth: 1,
      borderColor: theme.colors.border,
    },

    emptyIconCircle: {
      width: 64,
      height: 64,
      borderRadius: 32,
      backgroundColor: theme.colors.surfaceSoft,
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 14,
    },

    emptyTitle: {
      fontSize: 17,
      fontWeight: "800",
      color: theme.colors.text,
      marginBottom: 6,
    },

    emptyText: {
      fontSize: 14,
      color: theme.colors.textMuted,
      textAlign: "center",
      lineHeight: 20,
    },
  });