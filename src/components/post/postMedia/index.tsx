
import React, {
  useRef,
  useState,
  useMemo,
  useCallback,
  memo,
} from "react";

import {
  View,
  Image,
  TouchableOpacity,
  Text,
  Pressable,
  Animated,
  FlatList,
  Dimensions,
} from "react-native";

import Video from "react-native-video";
import Feather from "react-native-vector-icons/Feather";
import AntDesign from "react-native-vector-icons/AntDesign";

import type { Post } from "../../../types/post.types";
import { BASE_URL } from "../../../constants/ApiRoutes";
import { createStyles } from "./style";
import { useLike } from "../../../hooks/useLike";
import { useAppTheme } from "../../../theme/ThemeContext";

const { width } =
  Dimensions.get("window");

interface Props {
  post: Post;
}

export const PostMedia = memo(({
  post,
}: Props) => {
  const { theme } = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const media = post.media || [];

  const [currentIndex, setCurrentIndex] = useState(0);

  const flatListRef = useRef<FlatList<any>>(null);

  const {
    isLiked,
    toggleLike,
  } = useLike(post.postId);

  const scaleAnim = useRef(new Animated.Value(0)).current;

  const opacityAnim = useRef(new Animated.Value(0)).current;

  const lastTap = useRef(0);

  if (media.length === 0)
    return null;

  const animateHeart = useCallback(() => {
    scaleAnim.setValue(0.3);
    opacityAnim.setValue(1);

    Animated.parallel([
      Animated.spring(
        scaleAnim,
        {
          toValue: 1,
          friction: 5,
          tension: 120,
          useNativeDriver: true,
        }
      ),

      Animated.sequence([
        Animated.delay(700),
        Animated.timing(
          opacityAnim,
          {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }
        ),
      ]),
    ]).start();
  }, [opacityAnim, scaleAnim]);

  const handleDoubleTap = useCallback(() => {
    const now = Date.now();

    if (
      now -
        lastTap.current <
      300
    ) {
      if (!isLiked) {
        toggleLike();
      }

      animateHeart();
    }

    lastTap.current = now;
  }, [isLiked, toggleLike, animateHeart]);

  const scrollToIndex = useCallback((
    index: number
  ) => {
    flatListRef.current?.scrollToIndex({
      index,
      animated: true,
    });

    setCurrentIndex(index);
  }, []);

  const handlePrev = useCallback(() => {
    const newIndex =
      currentIndex === 0
        ? media.length - 1
        : currentIndex - 1;

    scrollToIndex(newIndex);
  }, [currentIndex, media.length, scrollToIndex]);

  const handleNext = useCallback(() => {
    const newIndex =
      currentIndex ===
      media.length - 1
        ? 0
        : currentIndex + 1;

    scrollToIndex(newIndex);
  }, [currentIndex, media.length, scrollToIndex]);

  const renderItem = useCallback(({
    item,
  }: any) => {
    const mediaUrl =
      item.url.startsWith(
        "http"
      )
        ? item.url
        : `${BASE_URL}/${item.url}`;

    return (
      <Pressable
        onPress={
          handleDoubleTap
        }
      >
        {item.type ===
        "image" ? (
          <Image
            source={{
              uri: mediaUrl,
            }}
            style={[
              styles.media,
              {
                width:
                  width - 32,
              },
            ]}
          />
        ) : (
          <Video
            source={{
              uri: mediaUrl,
            }}
            style={[
              styles.media,
              {
                width:
                  width - 32,
              },
            ]}
            controls
            resizeMode="contain"
          />
        )}
      </Pressable>
    );
  }, [handleDoubleTap, styles.media]);

  const keyExtractor = useCallback((
    item: any,
    index: number
  ) =>
    item._id ||
    index.toString(),
  []);

  const handleMomentumScrollEnd = useCallback((
    event: any
  ) => {
    const index =
      Math.round(
        event.nativeEvent
          .contentOffset.x /
          (width - 32)
      );

    setCurrentIndex(index);
  }, []);

  const getItemLayout = useCallback((
    _: any,
    index: number
  ) => ({
    length:
      width - 32,
    offset:
      (width - 32) *
      index,
    index,
  }), []);

  return (
    <View style={styles.container}>
      {}
      <FlatList
        ref={flatListRef}
        data={media}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={
          false
        }
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        onMomentumScrollEnd={handleMomentumScrollEnd}
        getItemLayout={getItemLayout}
      />

      <Animated.View
        pointerEvents="none"
        style={[
          styles.bigHeart,
          {
            opacity:
              opacityAnim,
            transform: [
              {
                scale:
                  scaleAnim,
              },
            ],
          },
        ]}
      >
        <AntDesign
          name="heart"
          size={96}
          color="#7C3AED"
        />
      </Animated.View>

      {media.length > 1 && (
        <>
          <TouchableOpacity
            style={
              styles.leftBtn
            }
            onPress={
              handlePrev
            }
          >
            <Feather
              name="chevron-left"
              size={20}
              color="#FFFFFF"
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={
              styles.rightBtn
            }
            onPress={
              handleNext
            }
          >
            <Feather
              name="chevron-right"
              size={20}
              color="#FFFFFF"
            />
          </TouchableOpacity>

          <View
            style={
              styles.counter
            }
          >
            <Text
              style={
                styles.counterText
              }
            >
              {currentIndex + 1} /{" "}
              {media.length}
            </Text>
          </View>
        </>
      )}
    </View>
  );
});

PostMedia.displayName = "PostMedia";