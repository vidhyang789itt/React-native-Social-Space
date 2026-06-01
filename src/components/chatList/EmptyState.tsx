import React from "react";
import {
  View,
  Text,
} from "react-native";

import Icon from "react-native-vector-icons/Feather";

import { createStyles } from "./style";
import { useAppTheme } from "../../theme/ThemeContext";


interface Props {
  searchTerm: string;
}

export const EmptyState = ({
  searchTerm,
}: Props) => {
  const { theme } = useAppTheme();
  const styles = createStyles(theme);
  return (
    <View
      style={
        styles.emptyState
      }
    >
      <Icon
        name="message-circle"
        size={42}
        color="#9CA3AF"
      />

      <Text
        style={
          styles.emptyTitle
        }
      >
        {searchTerm
          ? "No conversations found"
          : "No conversations yet"}
      </Text>

      {!searchTerm && (
        <Text
          style={
            styles.emptyDescription
          }
        >
          Start a new
          conversation or
          create a group
        </Text>
      )}
    </View>
  );
};