import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from "react-native";

import Feather from "react-native-vector-icons/Feather";
import Video from "react-native-video";

import { createStyles } from "./style";
import { useAppTheme } from "../../../theme/ThemeContext";
import { BASE_URL } from "../../../constants/ApiRoutes";


const { width } = Dimensions.get("window");
const PREVIEW_WIDTH = width - 32;

interface ExistingMedia {
  _id?: string;
  url: string;
  type: "image" | "video";
}

interface Props {
  mediaPreview: any[];
  existingMedia: ExistingMedia[];
  currentMediaIndex: number;
  setCurrentMediaIndex: (
    index: number
  ) => void;
  handlePickMedia: () => void;
  removeMedia: (index: number) => void;
  removeExistingMedia: (
    index: number
  ) => void;
}

export const MediaPreview = ({
  mediaPreview,
  existingMedia,
  currentMediaIndex,
  setCurrentMediaIndex,
  handlePickMedia,
  removeMedia,
  removeExistingMedia,
}: Props) => {
  const { theme } = useAppTheme();
  const styles = createStyles(theme);
  const allMedia = [
    ...existingMedia,
    ...mediaPreview,
  ];
  return (
    <View style={styles.container}>
      {allMedia.length === 0 ? (
        <TouchableOpacity
          activeOpacity={0.9}
          style={styles.emptyPreview}
          onPress={handlePickMedia}
        >
          <View style={styles.emptyIconCircle}>
            <Feather
              name="image"
              size={34}
              color="#7C3AED"
            />
          </View>

          <Text style={styles.emptyTitle}>
            Add Photos or Videos
          </Text>

          <Text style={styles.emptySubtitle}>
            Share what’s happening
          </Text>
        </TouchableOpacity>
      ) : (
        <View>
          <FlatList
            data={allMedia}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            keyExtractor={(_, i) =>
              i.toString()
            }
            renderItem={({
              item,
            }) => (
              <View
                style={{
                  width:
                    PREVIEW_WIDTH,
                }}
              >
                {item.type ===
                  "image" ? (
                  <Image
                      source={{
                        uri:
                          item.url
                            ? item.url.startsWith("http")
                              ? item.url
                              : `${BASE_URL}/${item.url}`
                            : item.preview,
                      }}
                    style={
                      styles.previewMedia
                    }
                  />
                ) : (
                  <Video
                    source={{
                      uri:
                        item.url
                          ? item.url.startsWith("http")
                            ? item.url
                            : `${BASE_URL}/${item.url}`
                          : item.preview,
                    }}
                    style={styles.previewMedia}
                    paused
                    resizeMode="cover"
                  />
                )}
              </View>
            )}
            onMomentumScrollEnd={(
              e
            ) => {
              const index =
                Math.round(
                  e.nativeEvent
                    .contentOffset.x /
                  PREVIEW_WIDTH
                );
              setCurrentMediaIndex(index);
            }}
          />

          {}
          <TouchableOpacity
            style={
              styles.removeBtn
            }
            onPress={() =>
              removeMedia(
                currentMediaIndex
              )
            }
          >
            <Feather
              name="x"
              size={16}
              color="#FFFFFF"
            />
          </TouchableOpacity>

          {}
          <TouchableOpacity
            style={styles.addBtn}
            onPress={handlePickMedia}
          >
            <Feather
              name="plus"
              size={18}
              color="#FFFFFF"
            />
          </TouchableOpacity>

          {}
          {allMedia.length >
            1 && (
              <View
                style={
                  styles.dotsContainer
                }
              >
                {allMedia.map(
                  (_, index) => (
                    <View
                      key={
                        index
                      }
                      style={[
                        styles.dot,
                        currentMediaIndex ===
                        index &&
                        styles.activeDot,
                      ]}
                    />
                  )
                )}
              </View>
            )}
        </View>
      )}
    </View>
  );
};