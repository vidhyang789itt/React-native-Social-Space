

import React, { memo, useMemo } from "react";
import {
  View,
  TouchableOpacity,
} from "react-native";

import type { Post } from "../../../types/post.types";

import { PostHeader } from "../postHeader";
import { PostContent } from "../postContent";
import { PostMedia } from "../postMedia";
import { PostActions } from "../postAction";
import { PostFooter } from "../postFooter";

import { createStyles } from "./style";
import { useAppTheme } from "../../../theme/ThemeContext";

interface Props {
  post: Post;
}

export const PostCard = memo(({ post }: Props) => {
  const { theme } = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  
  return (
    <View style={styles.card}>
      <PostHeader post={post} />

      <PostContent post={post} />

      <PostMedia post={post} />

      <PostActions post={post} />

      <PostFooter post={post} />
    </View>
  );
});

PostCard.displayName = "PostCard";