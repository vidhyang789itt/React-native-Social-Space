import React, { memo, useMemo } from "react";
import {
  View,
  TouchableOpacity,
  Text,
} from "react-native";

import AntDesign from "react-native-vector-icons/AntDesign";
import Feather from "react-native-vector-icons/Feather";

import { useNavigation } from "@react-navigation/native";

import type { Post } from "../../../types/post.types";

import { useLike } from "../../../hooks/useLike";
import { useComments } from "../../../hooks/useComment";
import { useAppTheme } from "../../../theme/ThemeContext";
import { createStyles } from "./style";


interface Props {
  post: Post;
}

export const PostActions = memo(({
  post,
}: Props) => {
  const navigation = useNavigation<any>();
  const { theme } = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const {
    isLiked,
    likeCount,
    toggleLike,
  } = useLike(post.postId);

  const { commentsCount } =
    useComments(post.postId);

  return (
    <View style={styles.container}>
      {}
      <TouchableOpacity
        style={styles.actionBtn}
        onPress={toggleLike}
      >
        <AntDesign
          name={
            isLiked
              ? "heart"
              : "hearto"
          }
          size={22}
          color={
            isLiked
              ? "#7C3AED"
              : "#6B7280"
          }
        />

        <Text style={styles.actionText}>
          {likeCount || ""}
        </Text>
      </TouchableOpacity>

      {}
      <TouchableOpacity
        style={styles.actionBtn}
        onPress={() =>
          navigation.navigate(
            "PostDetails",
            {
              postId: post.postId,
            }
          )
        }
      >
        <Feather
          name="message-circle"
          size={21}
          color="#6B7280"
        />

        <Text style={styles.actionText}>
          {commentsCount || ""}
        </Text>
      </TouchableOpacity>
    </View>
  );
});

PostActions.displayName = "PostActions";