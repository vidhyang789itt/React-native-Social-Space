import React, {
  useMemo,
  useState,
  useCallback,
} from "react";
import { createStyles } from "./style";
import { useAppTheme } from "../../theme/ThemeContext";


import {
  View,
  FlatList,
  ActivityIndicator,
} from "react-native";

import {
  useSelector,
  useDispatch,
} from "react-redux";

import {
  useNavigation,
  useRoute,
} from "@react-navigation/native";

import type {
  RootState,
  AppDispatch,
} from "../../store/store";

import {
  fetchConversations,
} from "../../store/slices/chatSlice";

import { ChatHeader } from "./ChatHeader";
import { ConversationItem } from "./ConversationItem";
import { EmptyState } from "./EmptyState";

import GroupChatModal from "../groupChatModel/index";

import { ConversationType } from "../../types/conversation.type";

export interface Conversation {
  _id: string;
  type: "direct" | "group";
  groupName?: string;
  groupImage?: string;
  updatedAt: string;
  lastMessage?: string;

  user1?: any;
  user2?: any;

  unreadCountUser1?: number;
  unreadCountUser2?: number;

  groupUnreadCounts?: {
    _id: string;
    unreadCount: number;
  }[];
}

const ChatList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { theme } = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const navigation = useNavigation<any>();

  const conversations = useSelector(
    (state: RootState) => state.chat.conversations
  );
  const loading = useSelector(
    (state: RootState) => state.chat.loading
  );
  const onlineUsers = useSelector(
    (state: RootState) => state.chat.onlineUsers
  );

  const currentUser = useSelector(
    (state: RootState) => state.auth.user
  );

  const [searchTerm, setSearchTerm] = useState("");

  const [showGroupModal, setShowGroupModal] = useState(false);

  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const filteredConversations = useMemo(() => {
    const filtered = conversations.filter((conv: ConversationType) => {
      if (conv.type === "group") {
        return (
          conv.groupName
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase()) ?? false
        );
      }

      const participant =
        conv.user1?.userId === currentUser?.userId
          ? conv.user2
          : conv.user1;

      return (
        participant?.username
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase()) ?? false
      );
    });

    return filtered.sort(
      (a: ConversationType, b: ConversationType) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    );
  }, [conversations, searchTerm, currentUser?.userId]);

  const isUserOnline = useCallback((userId?: string) => {
    if (!userId) {
      return false;
    }

    return onlineUsers.some(
      (id: string) => String(id).trim() === String(userId).trim()
    );
  }, [onlineUsers]);

  const handleRefresh = async () => {
    try {
      setIsLoadingMore(true);
      await dispatch(fetchConversations()).unwrap();
    } finally {
      setIsLoadingMore(false);
    }
  };

  const handleOpenChat = useCallback((conversation: ConversationType) => {
    navigation.navigate("Chat", {
      conversationId: conversation._id,
      otherUserId:
        conversation.user1?._id === currentUser?._id
          ? conversation.user2?.userId
          : conversation.user1?.userId,
      chatType: conversation.type,
    });
  }, [navigation, currentUser?._id]);

  const renderItem = useCallback(({ item }: { item: ConversationType }) => {
    const isGroup = item.type === "group";
    const participant = !isGroup
      ? item.user1?.userId === currentUser?.userId
        ? item.user2
        : item.user1
      : null;
    const online = !isGroup && participant && isUserOnline(participant.userId);

    return (
      <ConversationItem
        conversation={item}
        currentUser={currentUser}
        isOnline={!!online}
        onPress={handleOpenChat}
      />
    );
  }, [currentUser, isUserOnline, handleOpenChat]);

  const keyExtractor = useCallback((item: ConversationType) => item._id, []);

  if (loading && filteredConversations.length === 0) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#7C3AED" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ChatHeader
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onCreateGroup={() => setShowGroupModal(true)}
        loading={isLoadingMore}
      />

      {filteredConversations.length === 0 ? (
        <EmptyState searchTerm={searchTerm} />
      ) : (
        <FlatList
          data={filteredConversations}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          maxToRenderPerBatch={10}
          windowSize={10}
          initialNumToRender={8}
        />
      )}

      <GroupChatModal
        isOpen={showGroupModal}
        onClose={async () => {
          setShowGroupModal(false);
          await handleRefresh();
        }}
      />
    </View>
  );
};

export default ChatList;