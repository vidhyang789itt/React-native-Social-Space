

import React, { memo, useMemo } from "react";

import {
  View,
  Text,
  TouchableOpacity,
} from "react-native";

import { useNavigation } from "@react-navigation/native";

import type { Post } from "../../../types/post.types";

import { useComments } from "../../../hooks/useComment";

import { createStyles } from "./style";
import { useAppTheme } from "../../../theme/ThemeContext";

interface Props {
  post: Post;
}

export const PostFooter = memo(({
  post,
}: Props) => {
  const { theme } = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const navigation = useNavigation<any>();

  const { commentsCount } = useComments(post.postId);

  return (
    <View style={styles.container}>

      <TouchableOpacity
        onPress={() =>
          navigation.navigate(
            "PostDetails",
            {
              postId: post.postId,
            }
          )
        }
      >
        <Text style={styles.commentsText}>
          {commentsCount > 0
            ? `View all ${commentsCount} comments`
            : "Be the first to comment"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() =>
          navigation.navigate(
            "PostDetails",
            {
              postId: post.postId,
            }
          )
        }
      >
        <Text style={styles.detailsText}>
          More Details →
        </Text>
      </TouchableOpacity>

    </View>
  );
});

PostFooter.displayName = "PostFooter";