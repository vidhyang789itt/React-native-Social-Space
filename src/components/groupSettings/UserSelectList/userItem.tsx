import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";

import Icon from "react-native-vector-icons/Feather";

import { styles } from "./style";

interface User {
  userId: string;
  username: string;
  profileUrl?: string;
}

interface Props {
  user: User;
  isSelected: boolean;

  onSelectUser: (userId: string) => void;
  onViewProfile?: (userId: string) => void;

  getFullUrl: (url?: string) => string;

  showProfileLink?: boolean;
}

export const UserItem = ({
  user,
  isSelected,
  onSelectUser,
  onViewProfile,
  getFullUrl,
  showProfileLink = true,
}: Props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      style={[
        styles.item,
        isSelected &&
          styles.selectedItem,
      ]}
      onPress={() =>
        onSelectUser(user.userId)
      }
    >
      <Image
          source={
            user.profileUrl
              ? { uri: user.profileUrl }
              : require("../../../assests/temp_profile.webp")
          }
        style={styles.avatar}
      />

      <View style={styles.userInfo}>
        <Text
          style={styles.userName}
          numberOfLines={1}
        >
          {user.username}
        </Text>

        <Text
          style={styles.userStatus}
          numberOfLines={1}
        >
          Click to add • View profile →
        </Text>
      </View>

      {showProfileLink &&
        onViewProfile && (
          <TouchableOpacity
            style={styles.profileLink}
            onPress={(e) => {
              e.stopPropagation?.();
              onViewProfile(
                user.userId
              );
            }}
          >
            <Icon
              name="external-link"
              size={16}
              color="#7C3AED"
            />
          </TouchableOpacity>
        )}

      <View
        style={[
          styles.checkbox,
          isSelected &&
            styles.checkboxSelected,
        ]}
      >
        {isSelected && (
          <Icon
            name="check"
            size={12}
            color="#FFFFFF"
          />
        )}
      </View>
    </TouchableOpacity>
  );
};