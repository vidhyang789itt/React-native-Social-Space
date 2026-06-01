import { StyleSheet } from "react-native";
import type { AppTheme } from "../../../theme/theme";

export const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    swipeReplyAction: {
      width: 64,
      justifyContent: "center",
      alignItems: "center",
    },

    swipeReplyActionOther: {
      alignSelf: "stretch",
      marginLeft: 8,
    },

    swipeReplyActionMe: {
      alignSelf: "stretch",
      marginRight: 8,
    },

    swipeReplyIconBubble: {
      width: 36,
      height: 36,
      borderRadius: 18,
      backgroundColor: theme.colors.primarySoft,
      justifyContent: "center",
      alignItems: "center",
    },
  });
