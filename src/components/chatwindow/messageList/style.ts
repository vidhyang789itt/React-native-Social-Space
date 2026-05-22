import { StyleSheet } from "react-native";
import type { AppTheme } from "../../../theme/theme";

export const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    messageBubble: {
      backgroundColor: theme.mode === "dark" ? "#1f2937" : "#f3efff",
      paddingHorizontal: 13,
      paddingVertical: 9,
      borderRadius: 14,
      borderBottomLeftRadius: 5,
      marginTop: 3,
      borderWidth: 0,
    },

    messageBubbleMe: {
      backgroundColor: "#5b5ce2",
      borderColor: "#5b5ce2",
      borderBottomLeftRadius: 18,
      borderBottomRightRadius: 6,
    },

    messageText: {
      fontSize: 15,
      color: theme.colors.text,
      lineHeight: 21,
    },

    messageTextMe: {
      color: "#ffffff",
    },

    dateBadgeText: {
      paddingHorizontal: 10,
      paddingVertical: 4,
      backgroundColor: "transparent",
      borderRadius: 999,
      fontSize: 11,
      fontWeight: "800",
      color: theme.colors.textMuted,
      letterSpacing: 0.8,
      textTransform: "uppercase",
      overflow: "hidden",
    },

    timestamp: {
      fontSize: 10.5,
      color: theme.colors.textMuted,
      fontWeight: "500",
    },

    readByCount: {
      fontSize: 10.5,
      color: theme.colors.textMuted,
      fontWeight: "500",
    },

    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    flatListContent: {
      flexGrow: 1,
      paddingTop: 14,
      paddingBottom: 18,
    },
    emptyState: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: 24,
    },
    emptyStateTitle: {
      fontSize: 20,
      fontWeight: "700",
      color: theme.colors.text,
      marginBottom: 8,
    },
    emptyStateDescription: {
      fontSize: 14,
      color: theme.colors.textSoft,
      textAlign: "center",
    },
    dateBadgeContainer: {
      alignItems: "center",
      marginVertical: 14,
    },
    messageItemWrapper: {
      paddingHorizontal: 12,
      marginVertical: 3,
      alignItems: "flex-start",
    },
    messageItemWrapperMe: {
      alignItems: "flex-end",
    },
    messageContentWrapper: {
      maxWidth: "82%",
      flexDirection: "row",
      alignItems: "flex-end",
      gap: 6,
    },
    messageContentWrapperMe: {
      flexDirection: "row-reverse",
    },
    actionSection: {
      opacity: 0,
      marginBottom: 18,
    },
    actionSectionOpen: {
      opacity: 1,
    },
    messageContent: {
      flexShrink: 1,
    },
    senderName: {
      fontSize: 12,
      fontWeight: "700",
      color: theme.colors.primary,
      marginBottom: 4,
      marginLeft: 6,
    },
    deletedMessageBubble: {
      backgroundColor: theme.mode === "dark" ? "#451a1a" : "#fef2f2",
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderRadius: 16,
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
      borderWidth: 1,
      borderColor: theme.mode === "dark" ? "#7f1d1d" : "#fecaca",
    },
    deletedMessageBubbleMe: {
      backgroundColor: theme.mode === "dark" ? "#451a1a" : "#fee2e2",
    },
    deletedMessageText: {
      fontSize: 13,
      color: theme.mode === "dark" ? "#fca5a5" : "#991b1b",
      fontStyle: "italic",
    },
    deletedMessageTextMe: {
      color: theme.mode === "dark" ? "#fca5a5" : "#991b1b",
    },
    replyPreviewBox: {
      backgroundColor: theme.colors.primarySoft,
      paddingHorizontal: 11,
      paddingVertical: 8,
      borderRadius: 12,
      borderLeftWidth: 3,
      borderLeftColor: theme.colors.primary,
      flexDirection: "row",
      marginBottom: 6,
    },
    replyPreviewBoxMe: {
      backgroundColor: theme.colors.primarySoft,
      borderLeftColor: theme.colors.primary,
    },
    replySenderName: {
      fontSize: 12,
      fontWeight: "700",
      color: theme.colors.primary,
    },
    replySenderNameMe: {
      color: theme.colors.primary,
    },
    replyContent: {
      fontSize: 12,
      color: theme.colors.textMuted,
      marginTop: 2,
      lineHeight: 16,
    },
    replyContentMe: {
      color: theme.colors.textMuted,
    },
    mediaContainer: {
      gap: 7,
      marginVertical: 5,
    },
    mediaItem: {
      borderRadius: 16,
      overflow: "hidden",
      backgroundColor: theme.colors.surfaceSoft,
    },
    mediaImage: {
      width: 220,
      height: 220,
      borderRadius: 16,
      backgroundColor: theme.colors.surfaceSoft,
    },
    videoContainer: {
      position: "relative",
      width: 220,
      height: 220,
      borderRadius: 16,
      overflow: "hidden",
      backgroundColor: "#111827",
    },
    mediaVideo: {
      width: "100%",
      height: "100%",
    },
    playIcon: {
      position: "absolute",
      top: "50%",
      left: "50%",
      marginLeft: -24,
      marginTop: -24,
    },
    fileDownloadButton: {
      backgroundColor: theme.colors.card,
      paddingHorizontal: 12,
      paddingVertical: 11,
      borderRadius: 16,
      flexDirection: "row",
      alignItems: "center",
      marginVertical: 5,
      minWidth: 220,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    fileDownloadButtonMe: {
      backgroundColor: theme.colors.primarySoft,
      borderColor: theme.colors.primarySoft,
    },
    fileDownloadButtonLoading: {
      opacity: 0.65,
    },
    fileNameText: {
      fontSize: 13,
      fontWeight: "700",
      color: theme.colors.text,
    },
    fileNameTextMe: {
      color: theme.colors.primary,
    },
    fileSize: {
      fontSize: 11,
      color: theme.colors.textSoft,
      marginTop: 3,
    },
    fileSizeMe: {
      color: theme.colors.textMuted,
    },
    messageMetadata: {
      flexDirection: "row",
      gap: 7,
      marginTop: 4,
      paddingHorizontal: 7,
    },
    messageMetadataMe: {
      justifyContent: "flex-end",
    },

    closeButton: {
      position: "absolute",
      top: 16,
      right: 16,
      zIndex: 10,
      padding: 8,
    },
    navButton: {
      position: "absolute",
      top: "50%",
      marginTop: -14,
      backgroundColor: "rgba(255, 255, 255, 0.18)",
      padding: 8,
      borderRadius: 24,
      zIndex: 10,
    },
    navButtonLeft: {
      left: 16,
    },
    navButtonRight: {
      right: 16,
    },
    navButtonDisabled: {
      opacity: 0.5,
    },
    counterDisplay: {
      position: "absolute",
      bottom: 120,
      alignSelf: "center",
      backgroundColor: "rgba(0, 0, 0, 0.6)",
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 16,
      zIndex: 10,
    },
    counterText: {
      color: "#ffffff",
      fontSize: 14,
      fontWeight: "700",
    },
    thumbnailStripContainer: {
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: "rgba(0, 0, 0, 0.8)",
      height: 100,
    },
    thumbnailStripContent: {
      paddingHorizontal: 8,
      paddingVertical: 8,
      gap: 8,
    },
    thumbnailButton: {
      width: 80,
      height: 80,
      borderRadius: 10,
      overflow: "hidden",
      borderWidth: 2,
      borderColor: "transparent",
    },
    thumbnailButtonActive: {
      borderColor: theme.colors.primary,
    },
    thumbnailImage: {
      width: "100%",
      height: "100%",
    },
    mediaGridContainer: {
      width: 220,
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 6,
    },

    mediaGridItem: {
      width: 107,
      height: 107,
    },

    mediaImageGrid: {
      width: 107,
      height: 107,
      borderRadius: 14,
    },

    videoContainerGrid: {
      width: 107,
      height: 107,
      borderRadius: 14,
    },

    playIconGrid: {
      marginLeft: -17,
      marginTop: -17,
    },

    fileDownloadButtonGrid: {
      width: 107,
      height: 107,
      minWidth: 107,
      marginVertical: 0,
      paddingHorizontal: 8,
      paddingVertical: 8,
      flexDirection: "column",
      justifyContent: "center",
    },

    imageModalOverlay: {
      flex: 1,
      backgroundColor: "rgba(0, 0, 0, 0.95)",
    },

    imageContainer: {
      flex: 1,
      width: "100%",
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: 12,
      paddingBottom: 110,
    },

    imageElement: {
      width: "100%",
      height: "100%",
    },
  });
