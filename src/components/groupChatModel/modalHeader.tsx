import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { styles } from "./style";

interface Props {
  title: string;
  description: string;
  onClose: () => void;
  disabled?: boolean;
}

export const ModalHeader = ({
  title,
  description,
  onClose,
  disabled,
}: Props) => {
  return (
    <View style={styles.header}>
      <View style={styles.headerText}>
        <Text style={styles.headerTitle}>
          {title}
        </Text>
        <Text style={styles.headerDescription}>
          {description}
        </Text>
      </View>

      <TouchableOpacity
        onPress={onClose}
        disabled={disabled}
        style={styles.closeButton}
      >
        <Icon
          name="x"
          size={22}
          color="#6B7280"
        />
      </TouchableOpacity>
    </View>
  );
};