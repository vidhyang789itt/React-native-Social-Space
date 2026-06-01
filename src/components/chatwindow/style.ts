import { StyleSheet } from "react-native";
import type { AppTheme } from "../../theme/theme";

export const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.surface,
    },
    headerContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
      backgroundColor: theme.colors.surface,
    },
    headerContent: {
      flex: 1,
    },
    callButtonsContainer: {
      flexDirection: "row",
      gap: 8,
      paddingRight: 16,
    },
    callButton: {
      width: 40,
      height: 40,
      borderRadius: 20,
      alignItems: "center",
      justifyContent: "center",
      shadowColor: theme.colors.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: theme.mode === "dark" ? 0.35 : 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    audioCallButton: {
      backgroundColor: theme.colors.success,
    },
    videoCallButton: {
      backgroundColor: "#3b82f6",
    },
    callButtonDisabled: {
      backgroundColor: theme.colors.textSoft,
      opacity: 0.6,
    },
    messagesContainer: {
      flex: 1,
      position: "relative",
      backgroundColor: theme.colors.background,
    },
    composerContainer: {
      flexShrink: 0,
      backgroundColor: theme.colors.surface,
    },
    loadingContainer: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      gap: 12,
      backgroundColor: theme.colors.surface,
    },
    loadingText: {
      color: theme.colors.textSoft,
      fontSize: 14,
      fontWeight: "500",
    },
    scrollToBottomButton: {
      position: "absolute",
      bottom: 20,
      left: "50%",
      marginLeft: -60,
      backgroundColor: theme.colors.primary,
      paddingVertical: 10,
      paddingHorizontal: 16,
      borderRadius: 24,
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
      shadowColor: theme.colors.primary,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation: 8,
      zIndex: 100,
    },
    scrollToBottomText: {
      color: theme.colors.primaryText,
      fontSize: 14,
      fontWeight: "600",
    },
    followPromptContainer: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 16,
      paddingHorizontal: 20,
      backgroundColor: theme.colors.surfaceSoft,
      borderTopWidth: 1,
      borderTopColor: theme.colors.border,
      gap: 16,
    },
    lockIconContainer: {
      width: 48,
      height: 48,
      backgroundColor: theme.colors.primarySoft,
      borderRadius: 24,
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
    },
    lockIcon: {
      fontSize: 24,
    },
    followPromptContent: {
      flex: 1,
    },
    followPromptTitle: {
      fontSize: 14,
      fontWeight: "600",
      color: theme.colors.text,
      marginBottom: 4,
    },
    followPromptSubtitle: {
      fontSize: 12,
      color: theme.colors.textMuted,
    },
  });
