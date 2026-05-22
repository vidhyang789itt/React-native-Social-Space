import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { createStyles } from "./style";
import { useAppTheme } from "../../theme/ThemeContext";
import Icon from "react-native-vector-icons/Feather";

interface Props {
  searchTerm: string;
  onSearchChange: (
    text: string
  ) => void;
  onCreateGroup: () => void;
  loading?: boolean;
}

export const ChatHeader = ({
  searchTerm,
  onSearchChange,
  onCreateGroup,
  loading,
}: Props) => {
  const { theme } = useAppTheme();
  const styles = createStyles(theme);
  return (
    <View style={styles.header}>
      <View
        style={
          styles.headerTop
        }
      >
        <Text
          style={
            styles.title
          }
        >
          Messages
        </Text>

        <TouchableOpacity
          style={
            styles.newGroupButton
          }
          onPress={
            onCreateGroup
          }
          disabled={
            loading
          }
        >
          {loading ? (
            <ActivityIndicator
              size="small"
              color="#FFFFFF"
            />
          ) : (
            <>
              <Icon
                name="plus"
                size={18}
                color="#FFFFFF"
              />
              <Text
                style={
                  styles.newGroupText
                }
              >
                New Group
              </Text>
            </>
          )}
        </TouchableOpacity>
      </View>

      <View
        style={
          styles.searchWrapper
        }
      >
        <Icon
          name="search"
          size={18}
          color="#9CA3AF"
        />

        <TextInput
          style={
            styles.searchInput
          }
          placeholder="Search conversations..."
          placeholderTextColor="#9CA3AF"
          value={
            searchTerm
          }
          onChangeText={
            onSearchChange
          }
        />

        {searchTerm.length >
          0 && (
          <TouchableOpacity
            onPress={() =>
              onSearchChange(
                ""
              )
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
    </View>
  );
};