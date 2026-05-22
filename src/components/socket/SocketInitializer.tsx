import { useEffect } from "react";
import { useSelector } from "react-redux";

import type { RootState } from "../../store/store";

import {
  initializeSocket,
  disconnectSocket,
} from "../../services/socket/socketService";

const SocketInitializer = () => {
  const { user } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    if (!user?.userId) {
      return;
    }

    initializeSocket(user.userId);

    return () => {
      disconnectSocket();
    };
  }, [user?.userId]);

  return null;
};

export default SocketInitializer;