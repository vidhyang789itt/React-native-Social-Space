import React, { useEffect, useRef } from 'react';
import { useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../store/store';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import {
  fetchMessages,
  clearActiveChat,
  startConversation,
} from '../../store/slices/chatSlice';

import ChatWindow from '../../components/chatwindow';

const ChatScreen = () => {
  const route = useRoute<any>();
  const dispatch = useDispatch<AppDispatch>();
  const { conversationId, otherUserId, groupId, chatType } = route.params || {};
  const { activeConversation, isLoadingMessages } = useSelector(
    (state: RootState) => state.chat,
  );

  const loadedChatRef = useRef<string | null>(null);

  useEffect(() => {
    const currentChatId = otherUserId || groupId || conversationId;
    if (!currentChatId || loadedChatRef.current === currentChatId) {
      return;
    }

    loadedChatRef.current = currentChatId;
    console.log(otherUserId);
    

    if (otherUserId) {
      dispatch(startConversation(otherUserId))
        .then((res: any) => {
          const createdConversationId = res.payload?._id;
          if (createdConversationId) {
            dispatch(
              fetchMessages({
                conversationId: createdConversationId,
                page: 1,
                limit: 50,
              }),
            );
          }
        })
        .catch(error => {
          console.error('❌ Error starting conversation:', error);
        });
    } else if (conversationId) {
      dispatch(
        fetchMessages({
          conversationId,
          page: 1,
          limit: 50,
        }),
      );
    } else if (groupId) {
      dispatch(
        fetchMessages({
          conversationId: groupId,
          page: 1,
          limit: 50,
        }),
      );
    }

    return () => {
      dispatch(clearActiveChat());
      loadedChatRef.current = null;
    };
  }, [conversationId, otherUserId, groupId, chatType, dispatch]);

  if (!activeConversation && isLoadingMessages) {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#FFFFFF',
        }}
      >
        <ActivityIndicator size="large" color="#7C3AED" />
      </SafeAreaView>
    );
  }


  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#FFFFFF',
      }}
      edges={['left', 'right']}
    >
      <ChatWindow
        otherUserId={chatType === 'direct' ? otherUserId : undefined}
        groupId={chatType === 'group' ? conversationId : undefined}
      />
    </SafeAreaView>
  );

};

export default ChatScreen;
