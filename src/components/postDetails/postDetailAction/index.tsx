import React from "react";
import {
  View,
  TouchableOpacity,
  Text,
} from "react-native";

import Icon from "react-native-vector-icons/Feather";
import { createStyles } from "../style";
import { useAppTheme } from "../../../theme/ThemeContext";

interface Props {
  isLiked: boolean;
  likeCount: number;
  commentsCount: number;
  onLike: () => void;
  onComment: () => void;
}

export const PostDetailActions = ({
  isLiked,
  likeCount,
  commentsCount,
  onLike,
  onComment,
}: Props) => {
  const { theme } = useAppTheme(); 
  const styles = createStyles(theme);
  return (
    <View style={styles.actions}>
      <TouchableOpacity
        style={styles.actionBtn}
        onPress={onLike}
      >
        <Icon
          name={
            isLiked
              ? "heart"
              : "heart"
          }
          size={22}
          color={
            isLiked
              ? "#7C3AED"
              : "#6B7280"
          }
        />

        <Text
          style={
            styles.actionText
          }
        >
          {likeCount > 0
            ? likeCount
            : "Like"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.actionBtn}
        onPress={onComment}
      >
        <Icon
          name="message-circle"
          size={22}
          color="#6B7280"
        />

        <Text
          style={
            styles.actionText
          }
        >
          {commentsCount}
        </Text>
      </TouchableOpacity>
    </View>
  );
};