import React, { useRef, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { usePostDetail } from "./usePostDetail";
import Loader from "../../components/common";
import { ConfirmModal } from "../../components/deletePostModal";
import { CommentSection } from "../../components/comments/commentSection";
import { PostDetailHeader } from "../../components/postDetails/postDetailHeader";
import { PostDetailMedia } from "../../components/postDetails/postDetailMedia";
import { PostDetailActions } from "../../components/postDetails/postDetailAction";
import { useLike } from "../../hooks/useLike";
import { useComments } from "../../hooks/useComment";
import { createStyles } from "../../components/postDetails/style";
import { useAppTheme } from "../../theme/ThemeContext";

export const PostDetailPage = () => {
  const {
    post,
    loading,
    isOwner,
    handleDelete,
    navigation,
    BASE_URL,
  } = usePostDetail();
  const { theme } = useAppTheme(); 
  const styles = createStyles(theme);

  const { user: currentUser } = useSelector(
    (state: RootState) => state.auth
  );

  const {
    isLiked,
    likeCount,
    toggleLike,
  } = useLike(post?.postId || "");

  const {
    commentText,
    setCommentText,
    handleSendComment,
    handleDeleteComment,
    currentComments,
    handleUpdateComment,
  } = useComments(post?.postId || "");

  const commentInputRef = useRef<any>(null);

  const [showDeleteModal, setShowDeleteModal] =
    useState(false);

  if (loading) {
    return <Loader />;
  }

  if (!post) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.notFoundContainer}>
          <Text style={styles.notFoundText}>
            Post not found
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  const focusCommentInput = () => {
    commentInputRef.current?.focus?.();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={
          styles.scrollContent
        }
      >
        <View style={styles.card}>
          <PostDetailHeader
            post={post}
            isOwner={isOwner}
            BASE_URL={BASE_URL}
            onBack={() =>
              navigation.navigate("Home")
            }
            onEdit={() =>
              navigation.navigate(
                "EditPost",
                {
                  postId:
                    post.postId,
                }
              )
            }
            onDelete={() =>
              setShowDeleteModal(
                true
              )
            }
          />

          <Text style={styles.title}>
            {post.title}
          </Text>

          <PostDetailMedia
            media={post.media}
            BASE_URL={BASE_URL}
          />

          <Text style={styles.content}>
            {post.content}
          </Text>

          <PostDetailActions
            isLiked={isLiked}
            likeCount={likeCount}
            commentsCount={
              currentComments.length
            }
            onLike={toggleLike}
            onComment={
              focusCommentInput
            }
          />
        </View>

        <View
          style={
            styles.commentsCard
          }
        >
          <CommentSection
            commentInputRef={
              commentInputRef
            }
            currentComments={
              currentComments
            }
            commentText={
              commentText
            }
            setCommentText={
              setCommentText
            }
            handleSendComment={
              handleSendComment
            }
            handleDeleteComment={
              handleDeleteComment
            }
            handleUpdateComment={
              handleUpdateComment
            }
            BASE_URL={BASE_URL}
            navigation={
              navigation
            }
            currentUserId={
              currentUser
                ?.userId ||
              ""
            }
            isFixedLayout={
              false
            }
          />
        </View>
      </ScrollView>

      <ConfirmModal
        open={showDeleteModal}
        onClose={() =>
          setShowDeleteModal(
            false
          )
        }
        onConfirm={async () => {
          await handleDelete();
          setShowDeleteModal(
            false
          );
        }}
        action="Delete"
        message="Are you sure you want to delete this post?"
        messageHead="Delete Post"
      />
    </SafeAreaView>
  );
};