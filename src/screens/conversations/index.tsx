import React, {
  useEffect,
} from "react";

import {
  SafeAreaView,
} from "react-native";

import {
  useDispatch,
} from "react-redux";

import type {
  AppDispatch,
} from "../../store/store";

import {
  fetchConversations,
} from "../../store/slices/chatSlice";

import ChatList
  from "../../components/chatList";

const ConversationsScreen =
  () => {
    const dispatch =
      useDispatch<AppDispatch>();

    useEffect(() => {
      dispatch(
        fetchConversations()
      );
    }, [dispatch]);

    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor:
            "#FFFFFF",
        }}
      >
        <ChatList />
      </SafeAreaView>
    );
  };

export default
  ConversationsScreen;