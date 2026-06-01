

import { StyleSheet } from "react-native";
import type { AppTheme } from "../../../theme/theme";

export const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      position: "relative",
    },

    media: {
      width: "100%",
      height: 360,
      backgroundColor: theme.colors.surfaceSoft,
    },

    leftBtn: {
      position: "absolute",
      left: 12,
      top: "50%",
      width: 38,
      height: 38,
      borderRadius: 19,
      backgroundColor:
        theme.mode === "dark"
          ? "rgba(15, 23, 42, 0.72)"
          : "rgba(0, 0, 0, 0.4)",
      justifyContent: "center",
      alignItems: "center",
    },

    rightBtn: {
      position: "absolute",
      right: 12,
      top: "50%",
      width: 38,
      height: 38,
      borderRadius: 19,
      backgroundColor:
        theme.mode === "dark"
          ? "rgba(15, 23, 42, 0.72)"
          : "rgba(0, 0, 0, 0.4)",
      justifyContent: "center",
      alignItems: "center",
    },

    counter: {
      position: "absolute",
      bottom: 12,
      right: 12,
      backgroundColor:
        theme.mode === "dark"
          ? "rgba(15, 23, 42, 0.78)"
          : "rgba(0, 0, 0, 0.5)",
      paddingHorizontal: 10,
      paddingVertical: 4,
      borderRadius: 12,
    },

    counterText: {
      color: "#FFFFFF",
      fontSize: 12,
      fontWeight: "600",
    },

    bigHeart: {
      position: "absolute",
      top: "50%",
      left: "50%",
      marginLeft: -48,
      marginTop: -48,
      justifyContent: "center",
      alignItems: "center",
      zIndex: 10,
      elevation: 10,
    },
  });
