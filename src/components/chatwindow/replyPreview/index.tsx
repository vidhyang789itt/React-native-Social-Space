import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { createStyles } from "./style";
import { useAppTheme } from "../../../theme/ThemeContext";


interface ReplyPreviewProps {
  senderName: string;
  content: string;
  onClear: () => void;
}

export const ReplyPreview: React.FC<ReplyPreviewProps> = ({
  senderName,
  content,
  onClear,
}) => {
  const { theme } = useAppTheme();
  const styles = createStyles(theme);

  return (
    <View style={styles.replyPreviewContainer}>
      <View style={styles.replyContent}>
        <Text style={styles.replyLabel}>
          Replying to <Text style={styles.senderName}>{senderName}</Text>
        </Text>
        <Text
          style={styles.replyText}
          numberOfLines={2}
          ellipsizeMode="tail"
        >
          {content}
        </Text>
      </View>

      <TouchableOpacity
        onPress={onClear}
        activeOpacity={0.7}
        style={styles.closeButton}
        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
      >
        <Ionicons name="close" size={16} color="#64748b" />
      </TouchableOpacity>
    </View>
  );
};

