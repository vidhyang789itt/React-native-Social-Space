import React from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import Icon from "react-native-vector-icons/Feather";

import { BASE_URL } from "../../../constants/ApiRoutes";
import { styles } from "./style";

interface User {
  userId: string;
  username: string;
  profileUrl?: string;
}

interface SelectedUsersListProps {
  users: User[];
  onRemove: (userId: string) => void;
}

export const SelectedUsersList = ({
  users,
  onRemove,
}: SelectedUsersListProps) => {
  if (users.length === 0) {
    return null;
  }

  const getFullUrl = (url?: string) => {
    if (!url) {
      return Image.resolveAssetSource(
        require("../../../assests/temp_profile.webp")
      ).uri;
    }

    if (url.startsWith("http")) {
      return url;
    }

    return `${BASE_URL}/${url}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Selected Members ({users.length})
      </Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {users.map((user) => (
          <View
            key={user.userId}
            style={styles.userChip}
          >
            <Image
              source={{
                uri: getFullUrl(user.profileUrl),
              }}
              style={styles.avatar}
            />

            <Text
              numberOfLines={1}
              style={styles.username}
            >
              {user.username}
            </Text>

            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.removeButton}
              onPress={() =>
                onRemove(user.userId)
              }
            >
              <Icon
                name="x"
                size={12}
                color="#FFFFFF"
              />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};