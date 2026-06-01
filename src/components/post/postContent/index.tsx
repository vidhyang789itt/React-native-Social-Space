

import React, { memo, useMemo } from "react";
import {
  View,
  Text,
} from "react-native";

import type { Post } from "../../../types/post.types";
import { useAppTheme } from "../../../theme/ThemeContext";
import { createStyles } from "./style";


interface Props {
  post: Post;
}

export const PostContent = memo(({
  post,
}: Props) => {
  const { theme } = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <View style={styles.container}>

      <Text style={styles.title}>
        {post.title}
      </Text>

      <Text style={styles.content}>
        {post.content}
      </Text>

    </View>
  );
});

PostContent.displayName = "PostContent";