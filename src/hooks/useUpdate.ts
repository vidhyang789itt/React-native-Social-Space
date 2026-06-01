import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  markConversationAsRead,
  receiveNewMessage,
  setOnlineUsers,
  handleMessageDeletedFromSocket,
  handleNewGroupReceived,
  handleMessageDelivered,
  handleMessagesRead,
} from "../store/slices/chatSlice";
import type { AppDispatch, RootState } from "../store/store";
import { getSocket } from "../services/socket/socketService";
import type { ConversationType } from "../types/conversation.type";
import { showChatNotification } from "../utils/chatnotification/showNotification";
import { useChat } from "./useChat";

export const useUpdate = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user: currentUser } = useSelector((state: RootState) => state.auth);
  const { activeConversation, conversations } = useSelector(
    (state: RootState) => state.chat
  );
  const { markAsRead } = useChat();
  const listenersAttachedRef = useRef(false);

  useEffect(() => {
    const socket = getSocket();
    if (!socket) {
      console.error("❌ Socket not available");
      return;
    }
    if (listenersAttachedRef.current) {
      return;
    }

    listenersAttachedRef.current = true;

    const handleMessage = async (message: any) => {
      dispatch(receiveNewMessage(message));

      const senderUserId = message.senderId?.userId;
      const conversationId =
        typeof message.conversationId === "string"
          ? message.conversationId
          : message.conversationId?._id;

      const isMyMessage = senderUserId === currentUser?.userId;
      const isCurrentOpenChat = activeConversation?._id === conversationId;

      console.log(
        "Current active:",
        activeConversation?._id,
        "Incoming:",
        conversationId
      );

      if (isCurrentOpenChat && !isMyMessage && currentUser?.userId) {
        markAsRead(conversationId, currentUser?._id, senderUserId);
      }
      if (isMyMessage || isCurrentOpenChat) {
        return;
      }

      const conversation = conversations.find((c) => c._id === conversationId);
      const groupName =
        conversation?.type === "group" ? conversation.groupName : undefined;

      await showChatNotification(message, groupName);
    };


    const handleOnlineUsers = (onlineIds: string[]) => {
      if (!onlineIds || onlineIds.length === 0) {
        console.warn("⚠️ Empty online users list received");
      }
      const stringIds = (onlineIds || []).map((id) => String(id).trim());
      dispatch(setOnlineUsers(stringIds));
    };

    const handleError = (error: any) => {
      console.error("❌ Socket error:", error);
    };

    const handleConnect = () => {
      if (currentUser?.userId) {
        socket?.emit("userConnected", currentUser.userId);
      }
    };

    const handleDisconnect = (reason: string) => {
      console.log("❌ Socket disconnected:", reason);
    };

    const handleMessageDeleted = (data: any) => {
      console.log(`🗑️ Message deleted:`, data.messageId);
      dispatch(
        handleMessageDeletedFromSocket({
          messageId: data.messageId,
          deleteForAll: data.deleteForAll,
        })
      );
    };

    const handleNewGroupCreated = (group: ConversationType) => {
      console.log("recieved new group request");
      console.log(group);

      dispatch(
        handleNewGroupReceived({
          groupId: group._id,
          groupName: group.groupName,
          members: group.groupMembers,
          createdBy: group.groupAdmin,
          createdAt: group.createdAt,
        })
      );
    };

    socket.on("receiveMessage", handleMessage);
    socket.on("getOnlineUsers", handleOnlineUsers);
    socket.on("error", handleError);
    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);
    socket.on("messageDeleted", handleMessageDeleted);
    socket.on("newGroupCreated", handleNewGroupCreated);
    socket.on("messageDelivered", (data) => {
      dispatch(handleMessageDelivered(data));
    });
    socket.on("messagesRead", (data) => {
      dispatch(handleMessagesRead(data));
    });

    return () => {
      socket.off("receiveMessage", handleMessage);
      socket.off("getOnlineUsers", handleOnlineUsers);
      socket.off("messagesRead", handleMessagesRead);
      socket.off("error", handleError);
      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);
      socket.off("messageDeleted", handleMessageDeleted);
      socket.off("newGroupCreated", handleNewGroupCreated);
      listenersAttachedRef.current = false;
    };
  }, [dispatch, currentUser?.userId, activeConversation?._id, conversations]);

};