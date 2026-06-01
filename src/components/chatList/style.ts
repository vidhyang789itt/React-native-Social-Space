import { StyleSheet } from "react-native";
import type { AppTheme } from "../../theme/theme";

export const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.surface,
    },

    loaderContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme.colors.surface,
    },

    listContent: {
      paddingBottom: 20,
    },

    header: {
      paddingHorizontal: 16,
      paddingTop: 16,
      paddingBottom: 12,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
      backgroundColor: theme.colors.surface,
    },

    headerTop: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 12,
    },

    title: {
      fontSize: 28,
      fontWeight: "700",
      color: theme.colors.text,
    },

    newGroupButton: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: theme.colors.primary,
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderRadius: 10,
    },

    newGroupText: {
      color: theme.colors.primaryText,
      fontWeight: "600",
      marginLeft: 6,
      fontSize: 13,
    },

    searchWrapper: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: theme.colors.inputBackground,
      borderRadius: 12,
      paddingHorizontal: 12,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },

    searchInput: {
      flex: 1,
      marginLeft: 8,
      paddingVertical: 12,
      fontSize: 14,
      color: theme.colors.text,
    },

    conversationItem: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 16,
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
      backgroundColor: theme.colors.surface,
    },

    avatarWrapper: {
      position: "relative",
      marginRight: 12,
    },

    avatar: {
      width: 52,
      height: 52,
      borderRadius: 26,
      backgroundColor: theme.colors.surfaceSoft,
    },

    onlineDot: {
      position: "absolute",
      bottom: 2,
      right: 2,
      width: 12,
      height: 12,
      borderRadius: 6,
      backgroundColor: theme.colors.success,
      borderWidth: 2,
      borderColor: theme.colors.surface,
    },

    groupDot: {
      position: "absolute",
      bottom: 2,
      right: 2,
      width: 12,
      height: 12,
      borderRadius: 6,
      backgroundColor: theme.colors.primary,
      borderWidth: 2,
      borderColor: theme.colors.surface,
    },

    content: {
      flex: 1,
      justifyContent: "center",
    },

    name: {
      fontSize: 15,
      fontWeight: "700",
      color: theme.colors.text,
    },

    lastMessage: {
      marginTop: 2,
      fontSize: 13,
      color: theme.colors.textMuted,
    },

    unreadMessage: {
      fontWeight: "700",
      color: theme.colors.text,
    },

    metaSection: {
      alignItems: "flex-end",
      justifyContent: "center",
      marginLeft: 8,
    },

    time: {
      fontSize: 11,
      color: theme.colors.textSoft,
    },

    unreadBadge: {
      minWidth: 20,
      height: 20,
      borderRadius: 10,
      backgroundColor: theme.colors.primary,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 6,
      paddingHorizontal: 6,
    },

    unreadBadgeText: {
      color: theme.colors.primaryText,
      fontSize: 11,
      fontWeight: "700",
    },

    emptyState: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: 32,
      backgroundColor: theme.colors.surface,
    },

    emptyTitle: {
      marginTop: 12,
      fontSize: 16,
      fontWeight: "700",
      color: theme.colors.text,
      textAlign: "center",
    },

    emptyDescription: {
      marginTop: 6,
      fontSize: 13,
      color: theme.colors.textMuted,
      textAlign: "center",
      lineHeight: 20,
    },
  });
