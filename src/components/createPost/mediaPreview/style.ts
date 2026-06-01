import { StyleSheet, Dimensions } from "react-native";
import type { AppTheme } from "../../../theme/theme";

const { width } = Dimensions.get("window");
const PREVIEW_WIDTH = width - 32;

export const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      marginBottom: 24,
    },

    emptyPreview: {
      height: 280,
      borderRadius: 28,
      backgroundColor: theme.colors.primarySoft,
      borderWidth: 2,
      borderStyle: "dashed",
      borderColor: theme.mode === "dark" ? theme.colors.border : "#DDD6FE",
      justifyContent: "center",
      alignItems: "center",
    },

    emptyIconCircle: {
      width: 72,
      height: 72,
      borderRadius: 36,
      backgroundColor: theme.colors.surface,
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 18,
    },

    emptyTitle: {
      fontSize: 22,
      fontWeight: "700",
      color: theme.colors.text,
    },

    emptySubtitle: {
      marginTop: 8,
      fontSize: 14,
      color: theme.colors.textMuted,
    },

    previewMedia: {
      width: PREVIEW_WIDTH,
      height: 360,
      borderRadius: 28,
      backgroundColor: theme.colors.surfaceSoft,
    },

    removeBtn: {
      position: "absolute",
      top: 14,
      right: 14,
      width: 36,
      height: 36,
      borderRadius: 18,
      backgroundColor: "rgba(0,0,0,0.65)",
      justifyContent: "center",
      alignItems: "center",
    },

    addBtn: {
      position: "absolute",
      top: 14,
      right: 58,
      width: 36,
      height: 36,
      borderRadius: 18,
      backgroundColor: theme.colors.primary,
      justifyContent: "center",
      alignItems: "center",
    },

    dotsContainer: {
      position: "absolute",
      bottom: 16,
      alignSelf: "center",
      flexDirection: "row",
    },

    dot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: "rgba(255,255,255,0.5)",
      marginHorizontal: 4,
    },

    activeDot: {
      width: 22,
      backgroundColor: "#FFFFFF",
    },
  });
