
import { StyleSheet } from "react-native";
import type { AppTheme } from "../../theme/theme";
import { lightTheme } from "../../theme/theme";

export const createStyles = (_theme: AppTheme) => {
  const theme = lightTheme;
  return StyleSheet.create({
    loaderContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme.colors.background,
    },

    background: {
      flex: 1,
    },

    overlay: {
      flex: 1,
    },

    container: {
      flex: 1,
      justifyContent: "space-between",
      paddingHorizontal: 24,
      paddingTop: 110,
      paddingBottom: 48,
    },

    brandSection: {
      alignItems: "center",
    },

    brandTitle: {
      fontSize: 42,
      fontWeight: "900",
      color: "#FFFFFF",
      letterSpacing: 0.5,
    },

    brandSubtitle: {
      marginTop: 8,
      fontSize: 15,
      color: "rgba(255,255,255,0.85)",
      fontWeight: "500",
    },


    errorText: {
      color: theme.colors.danger,
      fontSize: 14,
      marginBottom: 16,
      textAlign: "center",
      fontWeight: "600",
    },

    inputContainer: {
      marginBottom: 16,
    },

    label: {
      fontSize: 13,
      fontWeight: "700",
      color: theme.colors.text,
      marginBottom: 8,
      letterSpacing: 0.3,
    },

    input: {
      height: 56,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: theme.colors.border,
      backgroundColor: theme.colors.inputBackground,
      paddingHorizontal: 18,
      fontSize: 15,
      color: theme.colors.text,
    },

    button: {
      height: 56,
      borderRadius: 16,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 8,
      backgroundColor: theme.colors.primary,

      shadowColor: theme.colors.primary,
      shadowOffset: {
        width: 0,
        height: 8,
      },
      shadowOpacity: 0.35,
      shadowRadius: 14,
      elevation: 10,
    },

    buttonDisabled: {
      opacity: 0.7,
    },

    buttonText: {
      color: theme.colors.primaryText,
      fontSize: 16,
      fontWeight: "800",
      letterSpacing: 0.4,
    },

    redirectContainer: {
      flexDirection: "row",
      justifyContent: "center",
      marginTop: 22,
    },

    redirectText: {
      color: theme.colors.textMuted,
      fontSize: 14,
    },

    redirectLink: {
      color: theme.colors.primary,
      fontSize: 14,
      fontWeight: "800",
    },
    centerContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: 24,
    },

    card: {
      width: "100%",
      maxWidth: 420,
      backgroundColor: "rgba(255,255,255,0.96)",
      borderRadius: 32,
      padding: 28,
      borderWidth: 1,
      borderColor: "rgba(255,255,255,0.3)",

      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 25,
      },
      shadowOpacity: 0.35,
      shadowRadius: 30,
      elevation: 20,
    },

    logoText: {
      fontSize: 34,
      fontWeight: "900",
      color: theme.colors.primary,
      textAlign: "center",
      marginBottom: 6,
    },

    logoSubtitle: {
      fontSize: 14,
      color: theme.colors.textMuted,
      textAlign: "center",
      marginBottom: 28,
    },

    title: {
      fontSize: 25,
      fontWeight: "800",
      color: theme.colors.text,
      marginBottom: 6,
    },

    subtitle: {
      fontSize: 13,
      color: theme.colors.textMuted,
      marginBottom: 28,
    },
  });
};