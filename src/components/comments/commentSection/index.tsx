import React, {
  useState,
  RefObject,
  useCallback,
  useMemo,
  memo,
} from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";

import Feather from "react-native-vector-icons/Feather";

import { formatDistanceToNow } from "date-fns";

import type { Comment } from "../../../types/comment.type";
import { useAppTheme } from "../../../theme/ThemeContext";
import { createStyles } from "./style";
import { getMediaUrl } from "../../../utils/getMediaUrl";


interface CommentSectionProps {
  commentInputRef: RefObject<TextInput>;

  currentComments: Comment[];
  commentText: string;
  setCommentText: (
    text: string
  ) => void;
  handleSendComment: () => void;
  handleDeleteComment: (
    commentId: string
  ) => void;
  handleUpdateComment: (
    commentId: string,
    newText: string
  ) => void;
  BASE_URL: string;
  navigation: any;
  currentUserId: string;
  isFixedLayout?: boolean;
}


const CommentItem = memo(({
  item,
  BASE_URL,
  currentUserId,
  navigation,
  styles,
  onEdit,
  onDelete,
}: {
  item: Comment;
  BASE_URL: string;
  currentUserId: string;
  navigation: any;
  styles: any;
  onEdit: (comment: Comment) => void;
  onDelete: (commentId: string) => void;
}) => {
  const profileUri = item.user?.profileUrl
    ? getMediaUrl(item.user.profileUrl)
    : null;

  const isOwner = currentUserId === item.user.userId;

  const handleUserPress = useCallback(() => {
    navigation.navigate("UserProfile", {
      userId: item.user.userId,
    });
  }, [navigation, item.user.userId]);

  const handleEditPress = useCallback(() => {
    onEdit(item);
  }, [onEdit, item]);

  const handleDeletePress = useCallback(() => {
    onDelete(item._id);
  }, [onDelete, item._id]);

  return (
    <View style={styles.commentItem}>
      <TouchableOpacity onPress={handleUserPress}>
        <Image
          source={
            profileUri
              ? { uri: profileUri }
              : require("../../../assests/temp_profile.webp")
          }
          style={styles.avatar}
        />
      </TouchableOpacity>

      <View style={styles.commentContent}>
        <View style={styles.authorRow}>
          <TouchableOpacity onPress={handleUserPress}>
            <Text style={styles.authorName}>{item.user.username}</Text>
          </TouchableOpacity>

          <Text style={styles.commentTime}>
            {item.createdAt
              ? formatDistanceToNow(new Date(item.createdAt), {
                addSuffix: true,
              })
              : "Just now"}
          </Text>
        </View>

        <Text style={styles.commentText}>{item.content}</Text>

        {isOwner && (
          <View style={styles.actionsRow}>
            <TouchableOpacity style={styles.actionButton} onPress={handleEditPress}>
              <Feather name="edit-2" size={14} color="#7C3AED" />
              <Text style={styles.editText}>Edit</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionButton} onPress={handleDeletePress}>
              <Feather name="trash-2" size={14} color="#EF4444" />
              <Text style={styles.deleteText}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
});

CommentItem.displayName = "CommentItem";

export const CommentSection = memo(({
  commentInputRef,
  currentComments,
  commentText,
  setCommentText,
  handleSendComment,
  handleDeleteComment,
  handleUpdateComment,
  BASE_URL,
  navigation,
  currentUserId,
}: CommentSectionProps) => {
  const [
    editingCommentId,
    setEditingCommentId,
  ] = useState<string | null>(
    null
  );
  const { theme } = useAppTheme();


  const styles = useMemo(() => createStyles(theme), [theme]);

  const [
    editingText,
    setEditingText,
  ] = useState("");

  const startEdit = useCallback((
    comment: Comment
  ) => {
    setEditingCommentId(
      comment._id
    );

    setEditingText(
      comment.content
    );

    commentInputRef.current?.focus();
  }, [commentInputRef]);

  const saveEdit = useCallback((
    commentId: string
  ) => {
    if (
      !editingText.trim()
    ) {
      return;
    }

    handleUpdateComment(
      commentId,
      editingText.trim()
    );

    setEditingCommentId(
      null
    );

    setEditingText("");

    setCommentText("");
  }, [editingText, handleUpdateComment, setCommentText]);

  const cancelEdit = useCallback(() => {
    setEditingCommentId(
      null
    );

    setEditingText("");
  }, []);

  const activeText =
    editingCommentId
      ? editingText
      : commentText;

  const activeSetter =
    editingCommentId
      ? setEditingText
      : setCommentText;

  return (
    <View>
      { }
      <View
        style={styles.inputCard}
      >
        {editingCommentId && (
          <View
            style={
              styles.editingBanner
            }
          >
            <Feather
              name="edit-2"
              size={14}
              color="#7C3AED"
            />
            <Text
              style={
                styles.editingText
              }
            >
              Editing comment...
            </Text>
          </View>
        )}

        <TextInput
          ref={commentInputRef}
          placeholder={
            editingCommentId
              ? "Edit your comment..."
              : "Write a comment..."
          }
          placeholderTextColor="#9CA3AF"
          value={activeText}
          onChangeText={
            activeSetter
          }
          multiline
          style={
            styles.input
          }
        />

        <View
          style={
            styles.buttonRow
          }
        >
          {editingCommentId ? (
            <>
              <TouchableOpacity
                style={
                  styles.saveButton
                }
                onPress={() =>
                  saveEdit(
                    editingCommentId
                  )
                }
                disabled={
                  !editingText.trim()
                }
              >
                <Feather
                  name="check"
                  size={16}
                  color="#FFFFFF"
                />
                <Text
                  style={
                    styles.primaryButtonText
                  }
                >
                  Save
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={
                  styles.cancelButton
                }
                onPress={
                  cancelEdit
                }
              >
                <Feather
                  name="x"
                  size={16}
                  color="#6B7280"
                />
                <Text
                  style={
                    styles.cancelButtonText
                  }
                >
                  Cancel
                </Text>
              </TouchableOpacity>
            </>
          ) : (
            <TouchableOpacity
              style={[
                styles.sendButton,
                !commentText.trim() &&
                styles.disabledButton,
              ]}
              onPress={
                handleSendComment
              }
              disabled={
                !commentText.trim()
              }
            >
              <Feather
                name="send"
                size={16}
                color="#FFFFFF"
              />
              <Text
                style={
                  styles.primaryButtonText
                }
              >
                Send
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      { }
      <Text
        style={styles.header}
      >
        Comments (
        {
          currentComments.length
        }
        )
      </Text>

      { }
      {currentComments.length ===
        0 ? (
        <View
          style={
            styles.emptyContainer
          }
        >
          <Text
            style={
              styles.emptyText
            }
          >
            No comments yet.
            Be the first to
            comment!
          </Text>
        </View>
      ) : (
        <View>
          {currentComments.map((item, index) => (
            <React.Fragment key={item._id}>
              {index > 0 && <View style={styles.separator} />}
              <CommentItem
                item={item}
                BASE_URL={BASE_URL}
                currentUserId={currentUserId}
                navigation={navigation}
                styles={styles}
                onEdit={startEdit}
                onDelete={handleDeleteComment}
              />
            </React.Fragment>
          ))}
        </View>
      )}
    </View>
  );
});

CommentSection.displayName = "CommentSection";
