import React, { useState, useEffect, forwardRef, useMemo, useCallback, memo } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
  Modal,
  ActivityIndicator,
  Pressable,
  Alert,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import RNFS from "react-native-fs";
import Share from "react-native-share";
import type { MessageType } from "../../../types/message.type";
import { MessageActions } from "../messageAction";
import SwipeReplyRow from "../showSwipeReply";
import { useAppTheme } from "../../../theme/ThemeContext";
import { createStyles } from "./style";

type MessageListItem =
  | { type: "date"; id: string; dateKey: string }
  | { type: "message"; id: string; message: MessageType };

interface MessageListProps {
  messages: MessageType[];
  isGroup: boolean;
  isDirect: boolean;
  currentUserId?: string;
  groupName?: string;
  getFullUrl: (url: string) => string;
  onDeleteMessage?: (messageId: string, deleteForAll: boolean) => void;
  onReply?: (messageId: string, senderName: string, content: string) => void;
  onScroll?: (event: any) => void;
  onScrollToBottom?: () => void;
  isLoadingMessages?: boolean;
  messagesPagination?: any;
  keyboardHeight?: number;
  onListLayout?: (height: number) => void;
  onContentHeightChange?: (height: number) => void;
}

interface ImageMedia {
  url: string;
  messageId: string;
  index: number;
}

const getDateLabel = (date: Date): string => {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  const messageDate = new Date(date);
  const messageDay = messageDate.toDateString();

  if (messageDay === today.toDateString()) {
    return "Today";
  } else if (messageDay === yesterday.toDateString()) {
    return "Yesterday";
  } else {
    return messageDate.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year:
        messageDate.getFullYear() !== today.getFullYear() ? "numeric" : undefined,
    });
  }
};



const MessageItem = memo(({
  msg,
  isMe,
  isGroup,
  currentUserId,
  isMenuOpen,
  downloadingFileId,
  getFullUrl,
  onDeleteMessage,
  onReply,
  onOpenMenu,
  onOpenImage,
  onDownloadFile,
  styles,
}: {
  msg: MessageType;
  isMe: boolean;
  isGroup: boolean;
  currentUserId?: string;
  isMenuOpen: boolean;
  downloadingFileId: string | null;
  getFullUrl: (url: string) => string;
  onDeleteMessage?: (messageId: string, deleteForAll: boolean) => void;
  onReply?: (messageId: string, senderName: string, content: string) => void;
  onOpenMenu: (messageId: string, isOpen: boolean) => void;
  onOpenImage: (originalUrl: string, messageId: string, index: number) => void;
  onDownloadFile: (url: string, fileName: string) => void;
  styles: any;
}) => {
  const isDeletedForAll = (msg as any).isDeletedForAll;
  const hasReply = (msg as any).replyTo && (msg as any).replyTo.content;
  const media = msg.media || [];
  const hasMedia = media.length > 0;

  return (
    <SwipeReplyRow
      isMe={isMe}
      onSwipeReply={() => {
        onReply?.(
          msg._id,
          msg.senderId?.username || "Unknown",
          msg.content || ""
        );
      }}
    >
      <View
        key={msg._id}
        style={[
          styles.messageItemWrapper,
          isMe && styles.messageItemWrapperMe,
        ]}
      >
        <View
          style={[
            styles.messageContentWrapper,
            isMe && styles.messageContentWrapperMe,
          ]}
        >
          {onDeleteMessage && (
            <View
              style={[
                styles.actionSection,
                isMenuOpen && styles.actionSectionOpen,
              ]}
            >
              <MessageActions
                messageId={msg._id}
                senderId={msg.senderId?.userId || ""}
                currentUserId={currentUserId || ""}
                isMe={isMe}
                messageCreatedAt={msg.createdAt}
                messageContent={msg.content || ""}
                senderName={msg.senderId?.username || "Unknown"}
                onDeleteForMe={() => onDeleteMessage(msg._id, false)}
                onDeleteForAll={() => onDeleteMessage(msg._id, true)}
                onReply={(messageId, senderName, content) => {
                  onReply?.(messageId, senderName, content);
                }}
                onOpenChange={(isOpen) => {
                  onOpenMenu(msg._id, isOpen);
                }}
              />
            </View>
          )}

          <View style={styles.messageContent}>
            {isGroup && !isMe && (
              <Text style={styles.senderName}>
                {msg.senderId?.username}
              </Text>
            )}

            {isDeletedForAll ? (
              <View
                style={[
                  styles.deletedMessageBubble,
                  isMe && styles.deletedMessageBubbleMe,
                ]}
              >
                <MaterialCommunityIcons
                  name="trash-can"
                  size={14}
                  color="#7f1d1d"
                />
                <Text
                  style={[
                    styles.deletedMessageText,
                    isMe && styles.deletedMessageTextMe,
                  ]}
                >
                  This message was deleted
                </Text>
              </View>
            ) : (
              <>
                {hasReply && (
                  <View
                    style={[
                      styles.replyPreviewBox,
                      isMe && styles.replyPreviewBoxMe,
                    ]}
                  >
                    <Ionicons
                      name="arrow-undo"
                      size={14}
                      color="#7c3aed"
                      style={{ marginTop: 2 }}
                    />
                    <View style={{ flex: 1, marginLeft: 8 }}>
                      <Text
                        style={[
                          styles.replySenderName,
                          isMe && styles.replySenderNameMe,
                        ]}
                        numberOfLines={1}
                      >
                        {(msg as any).replyTo.senderName}
                      </Text>
                      <Text
                        style={[
                          styles.replyContent,
                          isMe && styles.replyContentMe,
                        ]}
                        numberOfLines={2}
                      >
                        {(msg as any).replyTo.content}
                      </Text>
                    </View>
                  </View>
                )}

                {hasMedia && (
                  <View
                    style={[
                      styles.mediaContainer,
                      media.length > 1 && styles.mediaGridContainer,
                    ]}
                  >
                    {media.map((m, idx) => {
                      const fullUrl = getFullUrl(m.url);
                      const isDownloading = downloadingFileId === m.fileName;
                      const isGrid = media.length > 1;

                      return (
                        <View
                          key={idx}
                          style={[
                            styles.mediaItem,
                            isGrid && styles.mediaGridItem,
                          ]}
                        >
                          {m.type === "image" && (
                            <TouchableOpacity
                              onPress={() => onOpenImage(m.url, msg._id, idx)}
                              activeOpacity={0.85}
                            >
                              <Image
                                source={{ uri: fullUrl }}
                                style={[
                                  styles.mediaImage,
                                  isGrid && styles.mediaImageGrid,
                                ]}
                                resizeMode="cover"
                              />
                            </TouchableOpacity>
                          )}

                          {m.type === "video" && (
                            <View
                              style={[
                                styles.videoContainer,
                                isGrid && styles.videoContainerGrid,
                              ]}
                            >
                              <Image
                                source={{ uri: fullUrl }}
                                style={styles.mediaVideo}
                                resizeMode="cover"
                              />
                              <MaterialCommunityIcons
                                name="play-circle"
                                size={isGrid ? 34 : 48}
                                color="white"
                                style={[
                                  styles.playIcon,
                                  isGrid && styles.playIconGrid,
                                ]}
                              />
                            </View>
                          )}

                          {m.type === "file" && (
                            <TouchableOpacity
                              onPress={() => onDownloadFile(m.url, m.fileName || "document")}
                              disabled={isDownloading}
                              style={[
                                styles.fileDownloadButton,
                                isGrid && styles.fileDownloadButtonGrid,
                                isMe && styles.fileDownloadButtonMe,
                                isDownloading && styles.fileDownloadButtonLoading,
                              ]}
                            >
                              {isDownloading ? (
                                <ActivityIndicator
                                  color={isMe ? "#7c3aed" : "#64748b"}
                                  size="small"
                                />
                              ) : (
                                <MaterialCommunityIcons
                                  name="file-document"
                                  size={isGrid ? 20 : 24}
                                  color={isMe ? "#7c3aed" : "#64748b"}
                                />
                              )}
                              <View style={{ flex: 1, marginLeft: 10 }}>
                                <Text
                                  style={[
                                    styles.fileNameText,
                                    isMe && styles.fileNameTextMe,
                                  ]}
                                  numberOfLines={1}
                                >
                                  {m.fileName || "File"}
                                </Text>
                                {m.fileSize && !isGrid && (
                                  <Text
                                    style={[
                                      styles.fileSize,
                                      isMe && styles.fileSizeMe,
                                    ]}
                                  >
                                    {(m.fileSize / 1024 / 1024).toFixed(2)} MB
                                  </Text>
                                )}
                              </View>
                            </TouchableOpacity>
                          )}
                        </View>
                      );
                    })}
                  </View>
                )}

                {msg.content && (
                  <View
                    style={[
                      styles.messageBubble,
                      isMe && styles.messageBubbleMe,
                    ]}
                  >
                    <Text
                      style={[
                        styles.messageText,
                        isMe && styles.messageTextMe,
                      ]}
                    >
                      {msg.content}
                    </Text>
                  </View>
                )}
              </>
            )}

            <View
              style={[
                styles.messageMetadata,
                isMe && styles.messageMetadataMe,
              ]}
            >
              <Text style={styles.timestamp}>
                {new Date(msg.createdAt).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </Text>

              {isGroup && isMe && msg.readBy && msg.readBy.length > 1 && (
                <Text style={styles.readByCount}>
                  Read by {msg.readBy.length - 1}
                </Text>
              )}
              {isMe && !isGroup && (
                <Ionicons
                  name={
                    msg.isRead || (msg.readBy && msg.readBy.length > 0)
                      ? "checkmark-done"
                      : msg.deliveredTo && msg.deliveredTo.length > 0
                        ? "checkmark-done"
                        : "checkmark"
                  }
                  size={15}
                  color={
                    msg.isRead || (msg.readBy && msg.readBy.length > 0)
                      ? "#3b82f6"
                      : "#94a3b8"
                  }
                />
              )}
            </View>
          </View>
        </View>
      </View>
    </SwipeReplyRow>
  );
});

MessageItem.displayName = "MessageItem";


const MessageListComponent: React.ForwardRefRenderFunction<FlatList, MessageListProps> = (
  {
    messages,
    isGroup,
    currentUserId,
    groupName = "Chat",
    getFullUrl,
    onDeleteMessage,
    onScroll,
    onReply,
    onScrollToBottom,
    isLoadingMessages = false,
    messagesPagination = {},
    keyboardHeight = 0,
    onListLayout,
    onContentHeightChange,
  },
  ref
) => {
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<ImageMedia | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageModal, setImageModal] = useState(false);
  const [downloadingFileId, setDownloadingFileId] = useState<string | null>(null);
  const { theme } = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  
  const allImages = useMemo(() => {
    const images: ImageMedia[] = [];
    messages.forEach((msg) => {
      if (msg.media && msg.media.length > 0) {
        msg.media.forEach((m, idx) => {
          if (m.type === "image") {
            images.push({
              url: m.url,
              messageId: msg._id,
              index: idx,
            });
          }
        });
      }
    });
    return images;
  }, [messages]);

  const listData = useMemo<MessageListItem[]>(() => {
    const items: MessageListItem[] = [];
    if (messages.length === 0) return items;

    let lastDateKey = "";
    
    
    for (let i = messages.length - 1; i >= 0; i--) {
      const msg = messages[i];
      const dateKey = new Date(msg.createdAt).toDateString();

      items.push({
        type: "message",
        id: msg._id,
        message: msg,
      });

      
      const nextMsg = i > 0 ? messages[i - 1] : null;
      const nextDateKey = nextMsg ? new Date(nextMsg.createdAt).toDateString() : "";

      if (dateKey !== nextDateKey) {
        items.push({
          type: "date",
          id: `date-${dateKey}`,
          dateKey,
        });
      }
    }

    return items;
  }, [messages]);

  const handleScroll = useCallback((event: any) => {
    const { contentOffset, contentSize, layoutMeasurement } = event.nativeEvent;

    const isAtBottom =
      contentSize.height - contentOffset.y - layoutMeasurement.height < 100;

    if (isAtBottom) {
      onScrollToBottom?.();
    }

    onScroll?.(event);
  }, [onScroll, onScrollToBottom]);

  const handleOpenImage = useCallback((
    originalUrl: string,
    messageId: string,
    index: number
  ) => {
    const imgIdx = allImages.findIndex(
      (img) =>
        img.url === originalUrl &&
        img.messageId === messageId &&
        img.index === index
    );

    if (imgIdx !== -1) {
      setCurrentImageIndex(imgIdx);
      setSelectedImage(allImages[imgIdx]);
      setImageModal(true);
    }
  }, [allImages]);

  const handleNextImage = useCallback(() => {
    if (currentImageIndex < allImages.length - 1) {
      const nextIdx = currentImageIndex + 1;
      setCurrentImageIndex(nextIdx);
      setSelectedImage(allImages[nextIdx]);
    }
  }, [currentImageIndex, allImages]);

  const handlePrevImage = useCallback(() => {
    if (currentImageIndex > 0) {
      const prevIdx = currentImageIndex - 1;
      setCurrentImageIndex(prevIdx);
      setSelectedImage(allImages[prevIdx]);
    }
  }, [currentImageIndex, allImages]);

  const handleCloseModal = useCallback(() => {
    setSelectedImage(null);
    setCurrentImageIndex(0);
    setImageModal(false);
  }, []);
  
  const downloadFile = useCallback(async (url: string, fileName: string) => {
    try {
      setDownloadingFileId(fileName);
      const fullUrl = getFullUrl(url);

      
      const localFilePath = `${RNFS.DocumentDirectoryPath}/${fileName}`;

      
      const result = await RNFS.downloadFile({
        fromUrl: fullUrl,
        toFile: localFilePath,
      }).promise;

      if (result.statusCode === 200) {
        
        await Share.open({
          url: `file://${localFilePath}`,
          title: "Share File",
          filename: fileName,
        });

        setDownloadingFileId(null);
        Alert.alert("Success", "File downloaded successfully");
      }
    } catch (error) {
      console.error("Error downloading file:", error);
      setDownloadingFileId(null);
      Alert.alert("Error", "Failed to download file");
    }
  }, [getFullUrl]);

  const renderDateBadge = useCallback((dateKey: string) => (
    <View key={`date-${dateKey}`} style={styles.dateBadgeContainer}>
      <Text style={styles.dateBadgeText}>
        {getDateLabel(new Date(dateKey))}
      </Text>
    </View>
  ), [styles]);

  const handleOpenMenu = useCallback((msgId: string, isOpen: boolean) => {
    setOpenMenuId(isOpen ? msgId : null);
  }, []);

  const renderItem = useCallback(({ item }: { item: MessageListItem }) => {
    if (item.type === "date") {
      return renderDateBadge(item.dateKey);
    }

    const msg = item.message;
    const isMe = msg.senderId?.userId === currentUserId;
    const isMenuOpen = openMenuId === msg._id;

    return (
      <MessageItem
        msg={msg}
        isMe={isMe}
        isGroup={isGroup}
        currentUserId={currentUserId}
        isMenuOpen={isMenuOpen}
        downloadingFileId={downloadingFileId}
        getFullUrl={getFullUrl}
        onDeleteMessage={onDeleteMessage}
        onReply={onReply}
        onOpenMenu={handleOpenMenu}
        onOpenImage={handleOpenImage}
        onDownloadFile={downloadFile}
        styles={styles}
      />
    );
  }, [
    currentUserId,
    isGroup,
    openMenuId,
    downloadingFileId,
    getFullUrl,
    onDeleteMessage,
    onReply,
    handleOpenMenu,
    handleOpenImage,
    downloadFile,
    styles,
    renderDateBadge,
  ]);

  const keyExtractor = useCallback((item: MessageListItem) => item.id, []);

  return (
    <View style={styles.container}>
      <FlatList
        ref={ref}
        inverted={true}
        data={listData}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        contentContainerStyle={[
          styles.flatListContent,
          { paddingBottom: 18 },
        ]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        maxToRenderPerBatch={15}
        windowSize={15}
        initialNumToRender={12}
        removeClippedSubviews={true}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateTitle}>{groupName}</Text>
            <Text style={styles.emptyStateDescription}>
              This is the beginning of your conversation
            </Text>
          </View>
        }
        onLayout={(event) => {
          onListLayout?.(event.nativeEvent.layout.height);
        }}
        onContentSizeChange={(_, height) => {
          onContentHeightChange?.(height);
        }}
      />

      {}
      <Modal
        visible={imageModal}
        transparent
        animationType="fade"
        onRequestClose={handleCloseModal}
      >
        <Pressable
          style={styles.imageModalOverlay}
          onPress={handleCloseModal}
        >
          <TouchableOpacity
            style={styles.closeButton}
            onPress={handleCloseModal}
            activeOpacity={0.7}
          >
            <Ionicons name="close" size={28} color="white" />
          </TouchableOpacity>

          <Pressable
            style={styles.imageContainer}
            onPress={(e) => e.stopPropagation()}
          >
            <Image
              source={{
                uri: getFullUrl(selectedImage?.url || ""),
              }}
              style={styles.imageElement}
              resizeMode="contain"
            />
          </Pressable>

          {allImages.length > 1 && (
            <>
              <TouchableOpacity
                style={[
                  styles.navButton,
                  styles.navButtonLeft,
                  currentImageIndex === 0 && styles.navButtonDisabled,
                ]}
                onPress={handlePrevImage}
                disabled={currentImageIndex === 0}
                activeOpacity={0.7}
              >
                <Ionicons
                  name="chevron-back"
                  size={28}
                  color={
                    currentImageIndex === 0 ? "#64748b80" : "white"
                  }
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.navButton,
                  styles.navButtonRight,
                  currentImageIndex === allImages.length - 1 &&
                    styles.navButtonDisabled,
                ]}
                onPress={handleNextImage}
                disabled={currentImageIndex === allImages.length - 1}
                activeOpacity={0.7}
              >
                <Ionicons
                  name="chevron-forward"
                  size={28}
                  color={
                    currentImageIndex === allImages.length - 1
                      ? "#64748b80"
                      : "white"
                  }
                />
              </TouchableOpacity>

              <View style={styles.counterDisplay}>
                <Text style={styles.counterText}>
                  {currentImageIndex + 1} / {allImages.length}
                </Text>
              </View>

              <ScrollView
                horizontal
                style={styles.thumbnailStripContainer}
                contentContainerStyle={styles.thumbnailStripContent}
                showsHorizontalScrollIndicator={false}
              >
                {allImages.map((img, idx) => (
                  <TouchableOpacity
                    key={idx}
                    onPress={() => {
                      setCurrentImageIndex(idx);
                      setSelectedImage(allImages[idx]);
                    }}
                    activeOpacity={0.8}
                    style={[
                      styles.thumbnailButton,
                      currentImageIndex === idx &&
                        styles.thumbnailButtonActive,
                    ]}
                  >
                    <Image
                      source={{
                        uri: getFullUrl(selectedImage?.url || ""),
                      }}
                      style={styles.imageElement}
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </>
          )}
        </Pressable>
      </Modal>
    </View>
  );
};

const MessageList = memo(forwardRef(MessageListComponent));
MessageList.displayName = "MessageList";

export default MessageList;