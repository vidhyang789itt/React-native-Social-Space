import React from "react";
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Text,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useAppTheme } from "../../../theme/ThemeContext";
import { createStyles } from "./style";


interface MediaPreviewProps {
  previews: Array<{
    url: string;
    type: "image" | "video" | "file";
    name: string;
  }>;
  onRemove: (index: number) => void;
}

const MediaPreview: React.FC<MediaPreviewProps> = ({
  previews,
  onRemove,
}) => {
  const { theme } = useAppTheme();
  const styles = createStyles(theme);

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {previews.map((preview, idx) => (
          <View key={idx} style={styles.previewWrapper}>
            <View style={styles.previewTile}>
              {preview.type === "image" && (
                <Image
                  source={{ uri: preview.url }}
                  style={styles.previewImage}
                  resizeMode="cover"
                />
              )}

              {preview.type === "video" && (
                <View style={styles.videoPreview}>
                  <Image
                    source={{ uri: preview.url }}
                    style={styles.previewImage}
                    resizeMode="cover"
                  />
                  <View style={styles.videoOverlay}>
                    <MaterialCommunityIcons
                      name="play-circle"
                      size={24}
                      color="white"
                    />
                  </View>
                </View>
              )}

              {preview.type === "file" && (
                <View style={styles.filePreview}>
                  <MaterialCommunityIcons
                    name="file-document"
                    size={28}
                    color="#4f46e5"
                  />
                  <Text style={styles.fileName} numberOfLines={1}>
                    {preview.name}
                  </Text>
                </View>
              )}
            </View>

            <TouchableOpacity
              onPress={() => onRemove(idx)}
              style={styles.removeButton}
              activeOpacity={0.7}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <Ionicons name="close" size={12} color="white" />
            </TouchableOpacity>
          </View>
        ))}

      </ScrollView>
    </View>
  );
};


export default MediaPreview;