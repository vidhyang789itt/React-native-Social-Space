import { StyleSheet } from "react-native";
import type { AppTheme } from "../../theme/theme";

export const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    header: {
      paddingHorizontal: 16,
      paddingTop: 14,
      paddingBottom: 10,
      backgroundColor: theme.colors.surface,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },

    heading: {
      fontSize: 22,
      fontWeight: "800",
      color: theme.colors.text,
    },

    subHeading: {
      marginTop: 2,
      fontSize: 12,
      color: theme.colors.textMuted,
      fontWeight: "700",
    },

    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },

    scrollContent: {
      paddingBottom: 24,
    },

    loaderContainer: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },

    errorContainer: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: 24,
    },

    errorText: {
      color: theme.colors.danger,
      fontSize: 14,
      fontWeight: "700",
      textAlign: "center",
    },

    searchSection: {
      paddingHorizontal: 16,
      paddingTop: 12,
      backgroundColor: theme.colors.surface,
    },

    searchBox: {
      height: 46,
      borderRadius: 14,
      backgroundColor: theme.colors.inputBackground,
      borderWidth: 1,
      borderColor: theme.colors.border,
      paddingHorizontal: 14,
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
    },

    searchInput: {
      flex: 1,
      fontSize: 14,
      color: theme.colors.text,
      fontWeight: "500",
      paddingVertical: 0,
    },

    filterContainer: {
      paddingHorizontal: 16,
      paddingTop: 14,
      paddingBottom: 12,
      backgroundColor: theme.colors.surface,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },

    filterLabel: {
      fontSize: 12,
      fontWeight: "800",
      color: theme.colors.textMuted,
      marginBottom: 10,
      textTransform: "uppercase",
      letterSpacing: 0.6,
    },

    sortButtonsContainer: {
      flexDirection: "row",
      gap: 8,
      paddingRight: 16,
    },

    sortButton: {
      paddingHorizontal: 13,
      paddingVertical: 8,
      borderRadius: 999,
      backgroundColor: theme.colors.surfaceSoft,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },

    activeSortButton: {
      backgroundColor: theme.colors.primary,
      borderColor: theme.colors.primary,
    },

    sortButtonContent: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
    },

    sortButtonText: {
      fontSize: 12,
      fontWeight: "800",
      color: theme.colors.textMuted,
    },

    activeSortButtonText: {
      color: theme.colors.primaryText,
    },
  });