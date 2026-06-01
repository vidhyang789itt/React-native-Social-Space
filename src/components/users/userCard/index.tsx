import React, { useMemo, memo } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";

import type { RootState } from "../../../store/store";

import { FollowAction } from "../../profile/followAction";


import { BASE_URL } from "../../../constants/ApiRoutes";
import { User } from "../../../types/user.types";
import { useAppTheme } from "../../../theme/ThemeContext";
import { createStyles } from "./style";
import { getMediaUrl } from "../../../utils/getMediaUrl";

interface UserCardProps {
  user: User;
  isFollowing: boolean;
  allUsers: any[];
}

export const UserCard = memo(({
  user,
  allUsers,
}: UserCardProps) => {
  const navigation = useNavigation<any>();

  const { user: currentUser } = useSelector(
    (state: RootState) => state.auth
  );
  const { theme } = useAppTheme();


  const styles = useMemo(() => createStyles(theme), [theme]);


  const mutualUsers = useMemo(() => {
    return user.followers
      ?.filter((id: string) =>
        currentUser?.following?.includes(id)
      )
      .map((id: string) =>
        allUsers.find((u) => u._id === id)
      )
      .filter(Boolean) || [];
  }, [user.followers, currentUser?.following, allUsers]);

  const handlePress = useMemo(() => {
    return () => navigation.getParent()?.navigate("UserProfile", {
      userId:
        user.userId,
    });
  }, [navigation, user.userId]);

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={styles.card}
      onPress={handlePress}
    >
      <View style={styles.avatarWrapper}>
        <Image
          source={
            user.profileUrl
              ? { uri: getMediaUrl(user.profileUrl) }
              : require("../../../assests/temp_profile.webp")
          }
          style={styles.avatar}
        />
      </View>

      <View style={styles.userInfo}>
        <Text style={styles.username} numberOfLines={1}>
          {user.username}
        </Text>

        {mutualUsers.length > 0 ? (
          <Text style={styles.secondaryText} numberOfLines={1}>
            Followed by{" "}
            <Text style={styles.boldText}>{mutualUsers[0]?.username}</Text>
            {mutualUsers.length > 1 && ` +${mutualUsers.length - 1}`}
          </Text>
        ) : null}
      </View>

      <View style={styles.actionWrap}>
        <FollowAction targetUser={user} />
      </View>
    </TouchableOpacity>
  );
});

UserCard.displayName = "UserCard";
