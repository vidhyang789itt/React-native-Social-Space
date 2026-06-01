import React, { useEffect, useState } from "react";
import { PostForm } from "../../components/createPost/postForm";
import { usePostSubmit } from "../createPost/usePostCreate";
import { useDispatch, useSelector } from "react-redux";
import { fetchSinglePost } from "../../store/slices/postSlice";
import type { AppDispatch, RootState } from "../../store/store";
import Loader from "../../components/common/index";
import { useNavigation, useRoute } from "@react-navigation/native";
import { View, Text, TouchableOpacity } from "react-native";
import { useAppTheme } from "../../theme/ThemeContext";
import { createStyles } from "./style";

interface ExistingMedia {
  _id?: string;
  url: string;
  type: "image" | "video";
}

const PostEditPage: React.FC = () => {
  const styles = createStyles();
  const route = useRoute();
  const { postId } = route.params as { postId: string };
  const navigation = useNavigation<any>();
  const dispatch = useDispatch<AppDispatch>();
  const { singlePost, loading: postLoading } = useSelector(
    (state: RootState) => state.posts
  );
  const [removedMediaIds, setRemovedMediaIds] = useState<string[]>([]);
  const [currentExistingMedia, setCurrentExistingMedia] = useState<ExistingMedia[]>([]);

  const { handleSubmit: baseHandleSubmit, loading } = usePostSubmit({
    mode: "edit",
    post: singlePost || undefined,
    onSuccess: () => {
      navigation.navigate("PostDetails", {
        postId: postId,
      })
    },
    onClose: () => {
      navigation.navigate("PostDetails", {
        postId: postId,
      });
    },
  });

  useEffect(() => {
    if (postId) {
      dispatch(fetchSinglePost(postId));
    }
  }, [dispatch, postId]);

  useEffect(() => {
    if (singlePost?.media) {
      setCurrentExistingMedia(singlePost.media as ExistingMedia[]);
    }
  }, [singlePost]);

  const handleClose = () => {
    navigation.navigate("PostDetails", {
      postId: postId,
    });
  };

  const handleSubmit = async (
    title: string,
    content: string,
    mediaFiles?: File[]
  ) => {
    try {
      await baseHandleSubmit(
        title,
        content,
        mediaFiles,
        removedMediaIds,
        currentExistingMedia
      );
    } catch (error) {
      console.error("Error submitting post:", error);
      throw error;
    }
  };

  if (postLoading) {
    return (
      <View style={styles.container}>
        <Loader />
      </View>
    );
  }

  if (!singlePost) {
    return (
      <View style={styles.notFoundContainer}>
        <Text style={styles.notFoundText}>Post not found</Text>
        <TouchableOpacity style={styles.button} onPress={handleClose}>
          <Text style={styles.buttonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <PostForm
        initialTitle={singlePost.title}
        initialContent={singlePost.content}
        initialMedia={singlePost.media}
        onSubmit={handleSubmit}
        loading={loading}
        isEdit={true}
        onClose={handleClose}
        onRemovedMedia={setRemovedMediaIds}
        onExistingMediaChange={
          setCurrentExistingMedia
        }
      />
    </View>
  );
};

export default PostEditPage;