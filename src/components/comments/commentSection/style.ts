

import { StyleSheet } from "react-native";
import type { AppTheme } from "../../../theme/theme";

export const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    
    inputCard: {
      backgroundColor: theme.colors.surface,
      borderWidth: 1,
      borderColor: theme.colors.border,
      borderRadius: 20,
      padding: 16,
      marginBottom: 20,
    },

    editingBanner: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 10,
      paddingHorizontal: 12,
      paddingVertical: 8,
      backgroundColor: theme.colors.primarySoft,
      borderRadius: 12,
      alignSelf: "flex-start",
    },

    editingText: {
      marginLeft: 6,
      fontSize: 13,
      fontWeight: "600",
      color: theme.colors.primary,
    },

    input: {
      minHeight: 100,
      maxHeight: 180,
      backgroundColor: theme.colors.inputBackground,
      borderWidth: 1,
      borderColor: theme.colors.border,
      borderRadius: 16,
      paddingHorizontal: 14,
      paddingVertical: 12,
      fontSize: 15,
      color: theme.colors.text,
      lineHeight: 22,
      textAlignVertical: "top",
    },

    buttonRow: {
      flexDirection: "row",
      marginTop: 12,
      gap: 10,
    },

    
    sendButton: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      alignSelf: "flex-end",
      backgroundColor: theme.colors.primary,
      borderRadius: 12,
      paddingHorizontal: 18,
      height: 44,
    },

    saveButton: {
      flex: 1,
      height: 44,
      borderRadius: 12,
      backgroundColor: theme.colors.success,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
    },

    cancelButton: {
      flex: 1,
      height: 44,
      borderRadius: 12,
      backgroundColor: theme.colors.surfaceSoft,
      borderWidth: 1,
      borderColor: theme.colors.border,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
    },

    primaryButtonText: {
      marginLeft: 6,
      fontSize: 14,
      fontWeight: "700",
      color: theme.colors.primaryText,
    },

    cancelButtonText: {
      marginLeft: 6,
      fontSize: 14,
      fontWeight: "700",
      color: theme.colors.textMuted,
    },

    disabledButton: {
      opacity: 0.5,
    },

    
    header: {
      fontSize: 20,
      fontWeight: "700",
      color: theme.colors.text,
      marginBottom: 16,
    },

    
    emptyContainer: {
      backgroundColor: theme.colors.surface,
      borderWidth: 1,
      borderColor: theme.colors.border,
      borderRadius: 18,
      paddingVertical: 32,
      paddingHorizontal: 20,
      alignItems: "center",
    },

    emptyText: {
      fontSize: 14,
      lineHeight: 22,
      textAlign: "center",
      color: theme.colors.textMuted,
    },

    
    commentItem: {
      flexDirection: "row",
      alignItems: "flex-start",
      paddingVertical: 14,
    },

    avatar: {
      width: 42,
      height: 42,
      borderRadius: 21,
      backgroundColor: theme.colors.surfaceSoft,
    },

    commentContent: {
      flex: 1,
      marginLeft: 12,
    },

    authorRow: {
      flexDirection: "row",
      alignItems: "center",
      flexWrap: "wrap",
    },

    authorName: {
      fontSize: 14,
      fontWeight: "700",
      color: theme.colors.text,
      marginRight: 8,
    },

    commentTime: {
      fontSize: 12,
      color: theme.colors.textSoft,
    },

    commentText: {
      marginTop: 4,
      fontSize: 14,
      lineHeight: 22,
      color: theme.colors.textMuted,
    },

    
    actionsRow: {
      flexDirection: "row",
      marginTop: 10,
      gap: 16,
    },

    actionButton: {
      flexDirection: "row",
      alignItems: "center",
    },

    editText: {
      marginLeft: 4,
      fontSize: 13,
      fontWeight: "600",
      color: theme.colors.primary,
    },

    deleteText: {
      marginLeft: 4,
      fontSize: 13,
      fontWeight: "600",
      color: theme.colors.danger,
    },

    
    separator: {
      height: 1,
      backgroundColor: theme.colors.surfaceSoft,
      marginLeft: 54,
    },
  });