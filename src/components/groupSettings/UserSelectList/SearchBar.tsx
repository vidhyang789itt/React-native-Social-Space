import React from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";

import Icon from "react-native-vector-icons/Feather";

import { styles } from "./style";

interface Props {
  value: string;
  onChangeText: (text: string) => void;
  loading?: boolean;
}

export const SearchBar = ({
  value,
  onChangeText,
  loading,
}: Props) => {
  return (
    <View style={styles.searchWrapper}>
      <Icon
        name="search"
        size={18}
        color="#9CA3AF"
      />

      <TextInput
        style={styles.searchInput}
        placeholder="Search members by name..."
        placeholderTextColor="#9CA3AF"
        value={value}
        onChangeText={onChangeText}
        editable={!loading}
      />

      {value.length > 0 && (
        <TouchableOpacity
          onPress={() =>
            onChangeText("")
          }
        >
          <Icon
            name="x-circle"
            size={18}
            color="#9CA3AF"
          />
        </TouchableOpacity>
      )}
    </View>
  );
};