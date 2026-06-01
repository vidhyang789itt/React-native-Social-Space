

import { StyleSheet } from "react-native";
import type { AppTheme } from "../../theme/theme";

export const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },

    scrollContent: {
      padding: 16,
      paddingBottom: 40,
    },

    card: {
      backgroundColor: theme.colors.card,
      borderRadius: 24,
      padding: 18,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },

    commentsCard: {
      marginTop: 16,
      backgroundColor: theme.colors.card,
      borderRadius: 24,
      padding: 18,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },

    notFoundContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },

    notFoundText: {
      fontSize: 18,
      fontWeight: "600",
      color: theme.colors.textMuted,
    },

    backButton: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 18,
    },

    backText: {
      marginLeft: 6,
      color: theme.colors.primary,
      fontWeight: "600",
    },

    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },

    authorSection: {
      flexDirection: "row",
      alignItems: "center",
      flex: 1,
    },

    avatar: {
      width: 48,
      height: 48,
      borderRadius: 24,
      backgroundColor: theme.colors.surfaceSoft,
    },

    authorInfo: {
      marginLeft: 12,
    },

    authorName: {
      fontSize: 16,
      fontWeight: "700",
      color: theme.colors.text,
    },

    postTime: {
      marginTop: 2,
      fontSize: 12,
      color: theme.colors.textMuted,
    },

    ownerActions: {
      flexDirection: "row",
    },

    iconButton: {
      marginLeft: 12,
    },

    title: {
      marginTop: 18,
      fontSize: 24,
      fontWeight: "700",
      color: theme.colors.text,
    },

    content: {
      marginTop: 18,
      fontSize: 15,
      lineHeight: 24,
      color: theme.colors.textMuted,
    },

    actions: {
      flexDirection: "row",
      marginTop: 20,
      borderTopWidth: 1,
      borderTopColor: theme.colors.surfaceSoft,
      paddingTop: 14,
    },

    actionBtn: {
      flexDirection: "row",
      alignItems: "center",
      marginRight: 24,
    },

    actionText: {
      marginLeft: 6,
      fontSize: 14,
      fontWeight: "600",
      color: theme.colors.textMuted,
    },
  });