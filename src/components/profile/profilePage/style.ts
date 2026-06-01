

import { StyleSheet, Dimensions } from "react-native";
import type { AppTheme } from "../../../theme/theme";

const { width } = Dimensions.get("window");
const COLUMN_COUNT = 3;
const IMAGE_SIZE = width / COLUMN_COUNT - 2;

export const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },

    centered: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },

    
    headerContainer: {
      backgroundColor: theme.colors.surface,
      width: "100%",
    },

    coverBackground: {
      flex: 1,
      backgroundColor: theme.colors.surfaceSoft,
    },

    coverSection: {
      height: 150,
      width: "100%",
      overflow: "hidden",
    },

    coverImage: {
      width: "100%",
      height: "100%",
      resizeMode: "cover",
      backgroundColor: theme.colors.surfaceSoft,
    },

    
    mainContent: {
      paddingHorizontal: 20,
      marginTop: -50,
    },

    avatarWrapper: {
      marginBottom: 10,
      alignItems: "flex-start",
    },

    avatar: {
      width: 100,
      height: 100,
      borderRadius: 50,
      borderWidth: 4,
      borderColor: theme.colors.surface,
      backgroundColor: theme.colors.surfaceSoft,
    },

    changePhotoBtn: {
      marginTop: 8,
    },

    changePhotoText: {
      color: theme.colors.primary,
      fontSize: 14,
      fontWeight: "600",
    },

    
    infoSection: {
      marginTop: 10,
    },

    headerRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 20,
    },

    username: {
      fontSize: 24,
      fontWeight: "700",
      color: theme.colors.text,
    },

    buttonRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
    },

    
    editBtn: {
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: theme.colors.border,
      backgroundColor: theme.colors.surface,
    },

    editBtnText: {
      fontWeight: "600",
      color: theme.colors.text,
    },

    followBtn: {
      backgroundColor: theme.colors.primary,
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 8,
    },

    followBtnText: {
      color: theme.colors.primaryText,
      fontWeight: "600",
    },

    messageBtn: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: theme.colors.border,
      backgroundColor: theme.colors.surface,
    },

    messageBtnText: {
      fontWeight: "600",
      color: theme.colors.text,
    },

    
    statsRow: {
      flexDirection: "row",
      gap: 24,
      marginBottom: 20,
    },

    statBox: {
      flexDirection: "row",
      gap: 6,
    },

    statCount: {
      fontWeight: "bold",
      fontSize: 16,
      color: theme.colors.text,
    },

    statLabel: {
      fontSize: 16,
      color: theme.colors.textMuted,
    },

    
    tabDivider: {
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
      alignItems: "center",
      paddingVertical: 12,
      marginTop: 10,
      marginBottom: 1,
    },

    tabItemActive: {
      fontWeight: "700",
      color: theme.colors.text,
      fontSize: 14,
      borderTopWidth: 2,
      borderTopColor: theme.colors.text,
      paddingTop: 10,
      marginTop: -13,
    },

    
    postContainer: {
      margin: 1,
    },

    postImage: {
      width: IMAGE_SIZE,
      height: IMAGE_SIZE,
      backgroundColor: theme.colors.surfaceSoft,
    },

    
    emptyContainer: {
      padding: 60,
      alignItems: "center",
      justifyContent: "center",
    },

    emptyText: {
      color: theme.colors.textSoft,
      fontSize: 16,
      marginTop: 10,
    },

    
    divider: {
      height: 1,
      backgroundColor: theme.colors.surfaceSoft,
      marginTop: 10,
    },
  });