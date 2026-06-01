

import { StyleSheet } from "react-native";
import type { AppTheme } from "../../theme/theme";

export const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    pageWrapper: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },

    header: {
      paddingHorizontal: 18,
      paddingTop: 18,
      paddingBottom: 14,
      backgroundColor: theme.colors.surface,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },

    title: {
      fontSize: 24,
      fontWeight: "800",
      color: theme.colors.text,
    },

    markReadButton: {
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderRadius: 10,
      backgroundColor: theme.colors.primarySoft,
    },

    markReadText: {
      fontSize: 12,
      fontWeight: "700",
      color: theme.colors.primary,
    },

    filterSection: {
      backgroundColor: theme.colors.surface,
      paddingVertical: 10,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },

    filterScrollContent: {
      paddingHorizontal: 14,
      gap: 8,
    },

    filterTab: {
      paddingHorizontal: 14,
      paddingVertical: 8,
      borderRadius: 999,
      backgroundColor: theme.colors.surfaceSoft,
    },

    filterTabActive: {
      backgroundColor: theme.colors.primary,
    },

    filterText: {
      fontSize: 12,
      fontWeight: "800",
      color: theme.colors.textMuted,
    },

    filterTextActive: {
      color: theme.colors.primaryText,
    },

    listContent: {
      paddingVertical: 12,
    },

    notificationSection: {
      marginBottom: 14,
    },

    sectionHeader: {
      paddingHorizontal: 18,
      paddingVertical: 8,
      fontSize: 12,
      fontWeight: "800",
      color: theme.colors.textMuted,
      textTransform: "uppercase",
      letterSpacing: 0.7,
    },

    notificationItem: {
      position: "relative",
      marginHorizontal: 12,
      marginBottom: 8,
      padding: 12,
      borderRadius: 14,
      backgroundColor: theme.colors.card,
      flexDirection: "row",
      alignItems: "center",
      borderWidth: 1,
      borderColor: theme.colors.border,
    },

    unreadItem: {
      backgroundColor: theme.colors.primarySoft,
      borderColor: theme.colors.primary,
    },

    avatarWrapper: {
      width: 46,
      height: 46,
      marginRight: 12,
    },

    avatar: {
      width: 46,
      height: 46,
      borderRadius: 23,
      backgroundColor: theme.colors.surfaceSoft,
    },

    typeIconWrapper: {
      position: "absolute",
      right: -3,
      bottom: -3,
      width: 22,
      height: 22,
      borderRadius: 11,
      backgroundColor: theme.colors.surface,
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 1,
      borderColor: theme.colors.border,
    },

    content: {
      flex: 1,
      paddingRight: 8,
    },

    message: {
      fontSize: 14,
      lineHeight: 20,
      color: theme.colors.text,
    },

    username: {
      fontWeight: "800",
      color: theme.colors.text,
    },

    commentText: {
      fontStyle: "italic",
      color: theme.colors.textMuted,
    },

    time: {
      marginTop: 4,
      fontSize: 11,
      fontWeight: "600",
      color: theme.colors.textSoft,
    },

    postThumbnail: {
      width: 48,
      height: 48,
      borderRadius: 10,
      backgroundColor: theme.colors.surfaceSoft,
    },

    unreadIndicator: {
      position: "absolute",
      top: 12,
      right: 10,
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: theme.colors.primary,
    },

    emptyState: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: 24,
      gap: 12,
    },

    emptyText: {
      fontSize: 15,
      fontWeight: "700",
      color: theme.colors.textMuted,
      textAlign: "center",
    },
  });