

import React, { memo, useMemo } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";

import { useNavigation } from "@react-navigation/native";

import { formatDistanceToNow } from "date-fns";

import type { Post } from "../../../types/post.types";

import { BASE_URL } from "../../../constants/ApiRoutes";
import { useAppTheme } from "../../../theme/ThemeContext";
import { createStyles } from "./style";


interface Props {
  post: Post;
}

export const PostHeader = memo(({
  post,
}: Props) => {
  const { theme } = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>

      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.userRow}
        onPress={() =>
          navigation.getParent()?.navigate("UserProfile", {
            userId:
                post.author?.userId,
          })
        }
      >
        <Image
          source={
            post.author?.profileUrl
              ? {
                  uri: `${BASE_URL}/${post.author.profileUrl}`,
                }
              : require("../../../assests/temp_profile.png")
          }
          style={styles.avatar}
        />

        <View>
          <Text style={styles.username}>
            {post.author?.username}
          </Text>

          <Text style={styles.time}>
            {post.createdAt
              ? formatDistanceToNow(
                  new Date(
                    post.createdAt
                  ),
                  {
                    addSuffix: true,
                  }
                )
              : "Just now"}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
});

PostHeader.displayName = "PostHeader";