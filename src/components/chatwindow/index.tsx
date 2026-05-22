import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store/store";
import { useChat } from "../../hooks/useChat";
import { fetchMessages } from "../../store/slices/chatSlice";
import { useRoute, useNavigation } from "@react-navigation/native";
import { markConversationAsRead } from "../../store/slices/chatSlice";
import ChatHeader from "./chatWindowHeader";
import MessageList from "./messageList";
import MediaPreview from "./mediaPreview";
import ChatInput from "./chatInput";
import { uploadFileApi } from "../../services/chatService";
import { FollowAction } from "../profile/followAction";
import { ReplyPreview } from "./replyPreview";
import { InteractionManager } from "react-native";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  SafeAreaView,
  Animated,
  Keyboard,
  Easing,
} from "react-native";
import { Phone, Video, ArrowDown, Loader } from "lucide-react-native";
import { createStyles } from "./style";
import { useAppTheme } from "../../theme/ThemeContext";
import { BASE_URL } from "../../constants/ApiRoutes";

interface UploadedMedia {
  url: string;
  type: "image" | "video" | "file";
  fileName: string;
  fileSize: number;
}

interface ReplyingTo {
  messageId: string;
  senderName: string;
  content: string;
}

type ChatRouteParams = {
  otherUserId?: string;
  groupId?: string;
};

const ChatWindow = ({ otherUserId, groupId }: ChatRouteParams) => {
  const route = useRoute();
  const navigation = useNavigation();
  const fileInputRef = useRef(null);
  const inputRef = useRef(null);
  const { theme } = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);


  if (!otherUserId && !groupId) {
    throw new Error("No chat selected");
  }

  const [mediaFiles, setMediaFiles] = useState<
    { name: string; uri: string; type: string }[]
  >([]);
  const [mediaPreviews, setMediaPreviews] = useState<
    Array<{ url: string; type: "image" | "video" | "file"; name: string }>
  >([]);
  const [isUploading, setIsUploading] = useState(false);
  const [showGroupSettings, setShowGroupSettings] = useState(false);
  const [isFollowing, setIsFollowing] = useState(true);

  const [showArrowToBottom, setShowArrowToBottom] = useState(false);
  const [replyingTo, setReplyingTo] = useState<ReplyingTo | null>(null);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const markAsReadCalledRef = useRef(false);
  const shouldScrollToBottomRef = useRef(true);
  const loadingTriggeredRef = useRef(false);
  const isPaginatingRef = useRef(false);
  const anchorMessageRef = useRef<{ id: string; offset: number } | null>(null);
  const flatListRef = useRef<FlatList>(null);
  const listHeightRef = useRef(0);
  const contentHeightRef = useRef(0);
  const scrollOffsetRef = useRef(0);
  const keyboardPadding = useRef(new Animated.Value(0)).current;
  const dispatch = useDispatch<AppDispatch>();

  const {
    activeMessages,
    activeConversation,
    onlineUsers,
    messagesPagination,
    isLoadingMessages,
  } = useSelector((state: RootState) => state.chat);

  const { user: currentUser } = useSelector((state: RootState) => state.auth);
  const { sendMessage, markAsRead, deleteMsg } = useChat(otherUserId);
  const [isInitialPositioned, setIsInitialPositioned] = useState(false);

  const isDirect = !!otherUserId;
  const isGroup = !!groupId;

  const otherUser =
    isDirect && activeConversation?.type === "direct" && activeConversation
      ? activeConversation?.user1?.userId === currentUser?.userId
        ? activeConversation?.user2
        : activeConversation?.user1
      : null;

  const isOnline =
    isDirect && otherUser
      ? (() => {
        const otherUserIdStr = String(otherUser?.userId || "").trim();
        return onlineUsers.some((id: String) => String(id).trim() === otherUserIdStr);
      })()
      : false;

  const groupName =
    isGroup && activeConversation?.type === "group" && activeConversation
      ? activeConversation?.groupName || "Group Chat"
      : isDirect && otherUser
        ? otherUser?.username || "User"
        : "Chat";

  useEffect(() => {
    setIsInitialPositioned(false);
  }, [activeConversation?._id]);


  useEffect(() => {
    const showSub = Keyboard.addListener("keyboardDidShow", (event) => {
      const height = event.endCoordinates.height;

      setKeyboardHeight(height);

      Animated.timing(keyboardPadding, {
        toValue: height,
        duration: 160,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: false,
      }).start();
    });

    const hideSub = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardHeight(0);

      Animated.timing(keyboardPadding, {
        toValue: 0,
        duration: 140,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: false,
      }).start();
    });

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, [keyboardPadding]);


  useEffect(() => {
    if (isDirect && currentUser && otherUser) {
      const isUserFollowing = otherUser.followers?.includes(currentUser._id);
      setIsFollowing(!!isUserFollowing);
    } else {
      setIsFollowing(true);
    }
  }, [isDirect, currentUser, otherUser?.followers, otherUser?._id]);

  useEffect(() => {
    if (activeConversation && currentUser && !markAsReadCalledRef.current) {
      const convId = activeConversation._id;
      const myId = currentUser._id;

      if (otherUserId) {
        markAsRead(convId, myId, otherUserId);
      } else if (groupId) {
        markAsRead(groupId, myId, groupId);
      }

      dispatch(
        markConversationAsRead({
          convId,
          _id: currentUser._id,
        })
      );

      markAsReadCalledRef.current = true;
    }
  }, [
    activeConversation?._id,
    currentUser,
    otherUserId,
    groupId,
    dispatch,
    markAsRead,
  ]);

  useEffect(() => {
    markAsReadCalledRef.current = false;
  }, [otherUserId, groupId]);

  useEffect(() => {
    if (
      !isInitialPositioned ||
      isPaginatingRef.current ||
      activeMessages.length === 0
    ) {
      return;
    }

    if (!shouldScrollToBottomRef.current) {
      return;
    }

    const delay = keyboardHeight > 0 ? 40 : 100;

    const timer = setTimeout(() => {
      scrollToLatest(keyboardHeight === 0);
    }, delay);

    return () => clearTimeout(timer);
  }, [activeMessages.length, keyboardHeight, isInitialPositioned]);


  useEffect(() => {
    if (keyboardHeight <= 0 || activeMessages.length === 0) {
      return;
    }

    const timer = setTimeout(() => {
      scrollToLatest(false);
    }, 80);

    return () => clearTimeout(timer);
  }, [keyboardHeight, activeMessages.length]);

  const scrollToLatest = (animated: boolean) => {
    requestAnimationFrame(() => {
      flatListRef.current?.scrollToOffset({
        offset: 0,
        animated,
      });
    });
  };


  const handleScroll = (event: any) => {
    const { contentOffset, contentSize, layoutMeasurement } = event.nativeEvent;

    const isAtBottom = contentOffset.y < 100;

    shouldScrollToBottomRef.current = isAtBottom;
    scrollOffsetRef.current = contentOffset.y;
    setShowArrowToBottom(!isAtBottom);

    const isAtTop = contentSize.height - contentOffset.y - layoutMeasurement.height < 100;

    if (
      isAtTop &&
      !isLoadingMessages &&
      !loadingTriggeredRef.current &&
      messagesPagination.hasNextPage &&
      activeConversation?._id
    ) {
      loadingTriggeredRef.current = true;
      isPaginatingRef.current = true;

      const nextPage = messagesPagination.currentPage + 1;

      dispatch(
        fetchMessages({
          conversationId: activeConversation._id,
          page: nextPage,
          limit: 50,
        })
      ).finally(() => {
        loadingTriggeredRef.current = false;
        isPaginatingRef.current = false;
      });
    }
  };

  const handleScrollToBottom = () => {
    flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
    setShowArrowToBottom(false);
  };

  const uploadFiles = async (
    files: { name: string; uri: string; type: string }[]
  ): Promise<UploadedMedia[]> => {
    try {
      setIsUploading(true);
      const uploadedMedia: UploadedMedia[] = [];

      for (const file of files) {
        try {
          const data = await uploadFileApi(file as any);

          if (data.success) {
            const mediaType: "image" | "video" | "file" = file.type.startsWith(
              "image/"
            )
              ? "image"
              : file.type.startsWith("video/")
                ? "video"
                : "file";

            uploadedMedia.push({
              url: data.url,
              type: mediaType,
              fileName: data.fileName,
              fileSize: data.fileSize,
            });
          }
        } catch (error) {
          console.error(`❌ Error uploading ${file.name}:`, error);
          throw error;
        }
      }

      return uploadedMedia;
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileSelect = useCallback((
    files: { name: string; uri: string; type: string }[]
  ) => {
    setMediaFiles((prev) => [...prev, ...files]);

    files.forEach((file) => {
      let type: "image" | "video" | "file" = "file";

      if (file.type.startsWith("image/")) {
        type = "image";
      } else if (file.type.startsWith("video/")) {
        type = "video";
      }

      setMediaPreviews((prev) => [
        ...prev,
        { url: file.uri, type, name: file.name },
      ]);
    });
  }, []);

  const removeMedia = useCallback((index: number) => {
    setMediaFiles((prev) => prev.filter((_, i) => i !== index));
    setMediaPreviews((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const handleSend = useCallback(async (messageText: string) => {
    if (!messageText.trim() && mediaFiles.length === 0) {
      return;
    }

    if (!activeConversation || !currentUser) {
      return;
    }

    try {
      setIsUploading(true);

      let uploadedMedia: UploadedMedia[] = [];
      if (mediaFiles.length > 0) {
        uploadedMedia = await uploadFiles(mediaFiles);
      }

      let messageType: "text" | "image" | "video" | "file" | "mixed" = "text";
      if (uploadedMedia.length > 0) {
        if (messageText.trim()) {
          messageType = "mixed";
        } else {
          messageType = uploadedMedia[0].type;
        }
      }

      const messageData = {
        conversationId: activeConversation._id,
        senderId: currentUser.userId,
        receiverId: otherUserId || null,
        content: messageText.trim(),
        media: uploadedMedia,
        messageType,
        replyTo: replyingTo
          ? {
            messageId: replyingTo.messageId,
            senderName: replyingTo.senderName,
            content: replyingTo.content,
          }
          : null,
      };

      sendMessage(messageData);

      setMediaFiles([]);
      setMediaPreviews([]);
      setReplyingTo(null);

      if (!isPaginatingRef.current) {
        shouldScrollToBottomRef.current = true;
        setShowArrowToBottom(false);

        setTimeout(() => {
          scrollToLatest(keyboardHeight === 0);
        }, keyboardHeight > 0 ? 40 : 150);
      }
    } catch (error) {
      console.error("❌ Error sending message:", error);
      Alert.alert("Error", "Failed to send message. Please try again.");
    } finally {
      setIsUploading(false);
    }
  }, [mediaFiles, activeConversation, currentUser, otherUserId, replyingTo, sendMessage, keyboardHeight]);

  const handleDeleteMessage = useCallback((messageId: string, deleteForAll: boolean) => {
    if (!activeConversation) {
      console.error("❌ No active conversation");
      return;
    }

    deleteMsg(messageId, activeConversation._id, deleteForAll);
  }, [activeConversation, deleteMsg]);

  const getFullUrl = useCallback((url: string): string => {
    if (!url) return "";
    if (url.startsWith("http")) return url;
    if (url.startsWith("/")) return `${BASE_URL}${url}`;
    return `${BASE_URL}/${url}`;
  }, []);

  if (!activeConversation) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#8b5cf6" />
          <Text style={styles.loadingText}>Loading conversation...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <Animated.View
      style={[
        styles.container,
        {
          paddingBottom: keyboardPadding,
        },
      ]}
    >
      <View style={styles.headerContainer}>
        <View style={styles.headerContent}>
          <ChatHeader
            isDirect={isDirect}
            isGroup={isGroup}
            groupName={groupName}
            otherUser={otherUser}
            isOnline={isOnline}
            activeConversation={activeConversation}
            onBackPress={() => navigation.goBack()}
            onNavigateProfile={() => {
            }}
            onOpenGroupSettings={() => setShowGroupSettings(true)}
            getFullUrl={getFullUrl}
          />

        </View>
      </View>

      <View
        style={[
          styles.messagesContainer,
          {
            opacity:
              isInitialPositioned || activeMessages.length === 0
                ? 1
                : 0,
          },
        ]}
      >

        <MessageList
          ref={flatListRef}
          messages={activeMessages}
          isGroup={isGroup}
          isDirect={isDirect}
          currentUserId={currentUser?.userId}
          groupName={groupName}
          getFullUrl={getFullUrl}
          onDeleteMessage={handleDeleteMessage}
          onScroll={handleScroll}
          onReply={(msgId: string, sender: string, content: string) => {
            setReplyingTo({
              messageId: msgId,
              senderName: sender,
              content,
            });
          }}
          onScrollToBottom={() => setShowArrowToBottom(false)}
          isLoadingMessages={isLoadingMessages}
          messagesPagination={messagesPagination}
          keyboardHeight={keyboardHeight}
          onListLayout={(height: number) => {
            listHeightRef.current = height;
          }}
          onContentHeightChange={(height: number) => {
            contentHeightRef.current = height;
            if (!isInitialPositioned && activeMessages.length > 0) {
              setIsInitialPositioned(true);
            }
          }}

        />

        {showArrowToBottom && (
          <TouchableOpacity
            onPress={handleScrollToBottom}
            style={styles.scrollToBottomButton}
            activeOpacity={0.7}
          >
            <ArrowDown size={18} color="white" />
            <Text style={styles.scrollToBottomText}>Jump to Latest</Text>
          </TouchableOpacity>
        )}
      </View>

      {mediaPreviews.length > 0 && (
        <MediaPreview previews={mediaPreviews} onRemove={removeMedia} />
      )}

      {replyingTo && (
        <ReplyPreview
          senderName={replyingTo.senderName}
          content={replyingTo.content}
          onClear={() => setReplyingTo(null)}
        />
      )}

      <ChatInput
        isUploading={isUploading}
        mediaFiles={mediaFiles}
        fileInputRef={fileInputRef}
        inputRef={inputRef}
        onFileSelect={handleFileSelect}
        onSend={handleSend}
        onKeyboardHeightChange={setKeyboardHeight}
      />
    </Animated.View>
  );
};

export default ChatWindow;
