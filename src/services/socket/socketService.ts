
import { io, Socket } from "socket.io-client";
import { BASE_URL } from "../../constants/ApiRoutes";

let socket: Socket | null = null;
let reconnectTimeout: ReturnType<
  typeof setTimeout
> | null = null;

export const initializeSocket = (
  userId: string
): Socket => {
  if (socket?.connected) {
    return socket;
  }

  if (socket) {
    socket.connect();
    socket.emit(
      "userConnected",
      userId
    );
    return socket;
  }

  socket = io(BASE_URL, {
    query: {
      userId,
    },

    transports: [
      "websocket",
      "polling",
    ],

    reconnection: true,
    reconnectionAttempts: 10,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,

    timeout: 20000,

    forceNew: true,
  });

  socket.on("connect", () => {
    console.log(
      "✅ Socket connected:",
      socket?.id
    );

    if (reconnectTimeout) {
      clearTimeout(
        reconnectTimeout
      );
      reconnectTimeout = null;
    }

    socket?.emit(
      "userConnected",
      userId
    );
  });

  socket.on(
    "disconnect",
    (reason) => {
      console.log(
        "❌ Socket disconnected:",
        reason
      );
    }
  );

  socket.on(
    "connect_error",
    (error) => {
      console.log(
        "❌ Socket connection error:",
        error.message
      );
    }
  );

  socket.on("error", (error) => {
    console.log(
      "❌ Socket error:",
      error
    );
  });

  socket.on(
    "reconnect",
    (attempt) => {
      console.log(
        "🔄 Socket reconnected after",
        attempt,
        "attempt(s)"
      );

      socket?.emit(
        "userConnected",
        userId
      );
    }
  );

  socket.on(
    "reconnect_attempt",
    (attempt) => {
      console.log(
        "🔄 Reconnect attempt:",
        attempt
      );
    }
  );

  socket.on(
    "reconnect_failed",
    () => {
      console.log(
        "❌ Reconnect failed"
      );
    }
  );

  return socket;
};

export const getSocket = (): Socket | null => {
  if (!socket) {
    console.warn(
      "⚠️ Socket not initialized. Call initializeSocket() first."
    );
    return null;
  }

  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    console.log(
      "🔌 Disconnecting socket..."
    );

    socket.removeAllListeners();
    socket.disconnect();
    socket = null;
  }

  if (reconnectTimeout) {
    clearTimeout(
      reconnectTimeout
    );
    reconnectTimeout = null;
  }
};

export const isSocketConnected =
  (): boolean => {
    return !!socket?.connected;
  };

export const emitSocketEvent = (
  event: string,
  data?: any
) => {
  if (socket?.connected) {
    socket.emit(event, data);
  } else {
    console.warn(
      `⚠️ Cannot emit "${event}" - socket not connected`
    );
  }
};