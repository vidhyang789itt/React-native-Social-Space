import { useEffect, useState, useCallback } from "react";
import type { AppDispatch, RootState } from "../store/store";
import {
  fetchPostComments,
  addComment,
  deleteComment,
  updateComment,
} from "../store/slices/commentSlice";
import { useDispatch, useSelector } from "react-redux";

const EMPTY_ARRAY: any[] = [];

export const useComments = (postId: string) => {
  const dispatch = useDispatch<AppDispatch>();
  
  const currentComments = useSelector(
    (state: RootState) => state.comment.commentsByPostId[postId] || EMPTY_ARRAY
  );
  const loading = useSelector((state: RootState) => state.comment.loading);
  const error = useSelector((state: RootState) => state.comment.error);
  
  const [commentText, setCommentText] = useState("");

  const commentsCount = currentComments.length;

  useEffect(() => {
    if (postId) {
      dispatch(fetchPostComments(postId));
    }
  }, [postId, dispatch]);

  const handleSendComment = useCallback(async () => {
    if (!commentText.trim()) return;
    await dispatch(addComment({ postId, content: commentText }));
    setCommentText("");
  }, [postId, commentText, dispatch]);

  const handleDeleteComment = useCallback((commentId: string) => {
    dispatch(deleteComment({ postId, commentId }));
  }, [postId, dispatch]);

  const handleUpdateComment = useCallback((commentId: string, content: string) => {
    dispatch(updateComment({ postId, commentId, content }));
  }, [postId, dispatch]);

  return {
    commentsCount,
    currentComments,
    loading,
    error,
    commentText,
    setCommentText,
    handleSendComment,
    handleDeleteComment,
    handleUpdateComment,
  };
};
