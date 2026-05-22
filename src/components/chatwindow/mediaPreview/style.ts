import { StyleSheet } from "react-native";
import type { AppTheme } from "../../../theme/theme";

export const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      paddingHorizontal: 12,
      paddingTop: 10,
      paddingBottom: 8,
      borderTopWidth: 1,
      borderTopColor: theme.colors.border,
      backgroundColor: theme.colors.surface,
      maxHeight: 96,
    },
    scrollContent: {
      gap: 10,
      paddingHorizontal: 4,
      paddingTop: 6,
      paddingRight: 12,
    },
    previewWrapper: {
      position: "relative",
      width: 62,
      height: 62,
    },
    previewTile: {
      width: 62,
      height: 62,
      borderRadius: 12,
      overflow: "hidden",
      borderWidth: 1,
      borderColor: theme.colors.primarySoft,
      backgroundColor: theme.colors.primarySoft,
    },
    previewImage: {
      width: "100%",
      height: "100%",
    },
    videoPreview: {
      width: "100%",
      height: "100%",
      position: "relative",
    },
    videoOverlay: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor:
        theme.mode === "dark"
          ? "rgba(0, 0, 0, 0.45)"
          : "rgba(15, 23, 42, 0.35)",
      justifyContent: "center",
      alignItems: "center",
    },
    filePreview: {
      width: "100%",
      height: "100%",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme.colors.primarySoft,
      gap: 4,
      paddingHorizontal: 6,
    },
    fileName: {
      fontSize: 8,
      color: theme.colors.primary,
      fontWeight: "700",
      marginTop: 2,
    },
    removeButton: {
      position: "absolute",
      top: -6,
      right: -6,
      width: 20,
      height: 20,
      borderRadius: 10,
      backgroundColor: theme.colors.danger,
      justifyContent: "center",
      alignItems: "center",
      zIndex: 20,
      elevation: 4,
    },
  });
