
import { useDispatch, useSelector } from "react-redux";
import { deleteMsgForMe } from "../store/slices/chatSlice";
import type { AppDispatch, RootState } from "../store/store";
import { getSocket } from "../services/socket/socketService";

export const useChat = (currentOpenedChatId?: string) => {
  const dispatch = useDispatch<AppDispatch>();
  const { user: currentUser } = useSelector((state: RootState) => state.auth);

  const sendMessage = (data: any) => {
    const socket = getSocket();

    if (!socket) {
      console.error("❌ Socket not available");
      return;
    }

    try {
      socket.emit("sendMessage", data);
    } catch (error) {
      console.error("❌ Error emitting message:", error);
    } 

    console.log(`data => ${data}`);
  };
  
  const markAsRead = (
    conversationId: string,
    currentUserId: string,
    otherUserId: string
  ) => {
    const socket = getSocket();
    console.log(conversationId);
    
    if (socket?.connected) {
      socket.emit("markAsRead", {
        conversationId,
        userId: currentUserId,
        senderId: otherUserId,
      });
    } else {
      console.warn("⚠️ Socket not connected, cannot mark as read");
    }
  };

  const deleteMsg = (
    messageId: string,
    conversationId: string,
    deleteForAll: boolean
  ) => {
    const socket = getSocket();

    if (!socket) {
      console.error("❌ Socket not available");
      return;
    }

    try {
      if(deleteForAll){
        socket.emit("deleteMessage", {
          messageId,
          conversationId,
          userId: currentUser?.userId,
          deleteForAll,
        });
      }
      else{
        dispatch(deleteMsgForMe(messageId));
      }

    } catch (error) {
      console.error("❌ Error deleting message:", error);
    }
  };

  const notifyGroupCreation = (groupData: {
    groupId: string;
    groupName: string;
    members: string[];
    createdBy: string;
  }) => {
    const socket = getSocket();

    console.log(groupData);
    

    if (!socket) {
      console.error("❌ Socket not available");
      return;
    }

    try {
      socket.emit("groupCreated", {
        ...groupData,
        timestamp: new Date().toISOString(),
      });
      console.log("✅ Group creation notified via WebSocket");
    } catch (error) {
      console.error("❌ Error emitting group creation:", error);
    }
  };


  return { sendMessage, markAsRead, deleteMsg, notifyGroupCreation };
};