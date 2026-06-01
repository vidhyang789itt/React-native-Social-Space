

import { StyleSheet } from "react-native";
import type { AppTheme } from "../../theme/theme";

export const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 18,
    paddingHorizontal: 16,
    backgroundColor: theme.colors.background,
  },

    listContent: {
      paddingBottom: 20,
    },

    errorContainer: {
      justifyContent: "center",
      alignItems: "center",
      marginTop: 30,
    },

    errorText: {
      color: theme.colors.danger,
      fontSize: 15,
      fontWeight: "600",
    },

   emptyContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme.colors.background,
    },

    emptyText: {
      color: theme.colors.textMuted,
      fontSize: 20,
      fontWeight: "600",
    },

    paginationWrapper: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: 20,
    },

    navButton: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: theme.colors.surface,
      paddingHorizontal: 14,
      paddingVertical: 10,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: theme.colors.primarySoft,
    },

    disabledButton: {
      opacity: 0.5,
    },

    navText: {
      color: theme.colors.primary,
      fontSize: 13,
      fontWeight: "700",
      marginHorizontal: 4,
    },

    pageNumbers: {
      flexDirection: "row",
      alignItems: "center",
    },

    pageButton: {
      width: 34,
      height: 34,
      borderRadius: 17,
      justifyContent: "center",
      alignItems: "center",
      marginHorizontal: 4,
      backgroundColor: theme.colors.surface,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },

    activePageButton: {
      backgroundColor: theme.colors.primary,
      borderColor: theme.colors.primary,
    },

    pageText: {
      color: theme.colors.text,
      fontSize: 13,
      fontWeight: "700",
    },

    activePageText: {
      color: theme.colors.primaryText,
    },

    dots: {
      color: theme.colors.textSoft,
      fontSize: 16,
      marginHorizontal: 4,
    },

    resultsText: {
      textAlign: "center",
      marginTop: 18,
      color: theme.colors.textMuted,
      fontSize: 13,
      fontWeight: "500",
    },
  });
