import { StyleSheet } from "react-native";
import type { AppTheme } from "../../../theme/theme";

export const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    replyPreviewContainer: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 12,
      paddingVertical: 10,
      backgroundColor: theme.colors.primarySoft,
      borderLeftWidth: 3,
      borderLeftColor: theme.colors.primary,
      gap: 12,
    },
    replyContent: {
      flex: 1,
      justifyContent: "center",
    },
    replyLabel: {
      fontSize: 12,
      fontWeight: "600",
      color: theme.colors.textMuted,
      marginBottom: 4,
    },
    senderName: {
      color: theme.colors.primary,
      fontWeight: "700",
    },
    replyText: {
      fontSize: 13,
      color: theme.colors.text,
      lineHeight: 18,
    },
    closeButton: {
      padding: 8,
      justifyContent: "center",
      alignItems: "center",
    },
  });
