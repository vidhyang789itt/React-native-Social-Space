import React from "react";
import {
  View,
  Text,
} from "react-native";

import Icon from "react-native-vector-icons/Feather";

import { styles } from "./style";

interface Props {
  title: string;
  description: string;
}

export const EmptyState = ({
  title,
  description,
}: Props) => {
  return (
    <View style={styles.emptyState}>
      <Icon
        name="alert-circle"
        size={34}
        color="#9CA3AF"
      />

      <Text style={styles.emptyTitle}>
        {title}
      </Text>

      <Text style={styles.emptyDescription}>
        {description}
      </Text>
    </View>
  );
};