import { useEffect } from "react";
import { AppState, Platform } from "react-native";
import { useDispatch } from "react-redux";
import notifee, { AndroidImportance, AuthorizationStatus } from "@notifee/react-native";

import { addLiveNotification } from "../store/slices/notificationSlice";
import type { AppDispatch } from "../store/store";
import { getSocket } from "../services/socket/socketService";
import { getNotificationMessage } from "../utils/NotificationMsgGenerator";

const CHANNEL_ID = "socialspace-notifications";

const ensureNotificationPermission = async () => {
  const settings = await notifee.requestPermission();

  return (
    settings.authorizationStatus === AuthorizationStatus.AUTHORIZED ||
    settings.authorizationStatus === AuthorizationStatus.PROVISIONAL
  );
};

const ensureNotificationChannel = async () => {
  return notifee.createChannel({
    id: CHANNEL_ID,
    name: "SocialSpace Notifications",
    importance: AndroidImportance.HIGH,
    sound: "default",
    vibration: true,
  });
};

const showLocalNotification = async (notification: any) => {
  const allowed = await ensureNotificationPermission();
  if (!allowed) return;

  const channelId = await ensureNotificationChannel();
  
  await notifee.displayNotification({
    title: "SocialSpace",
    body: getNotificationMessage(notification),
    android: {
      channelId,
      smallIcon: "ic_launcher",
      pressAction: {
        id: "default",
      },
    },
  });

};

export const useNotifications = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    let cleanup: (() => void) | undefined;
    let timeout: ReturnType<typeof setTimeout>;

    const attachListener = () => {
      const socket = getSocket();

      if (!socket) {
        timeout = setTimeout(attachListener, 500);
        return;
      }

      const handleNotification = async (notification: any) => {
        console.log("NEW NOTIFICATION:", notification);

        dispatch(addLiveNotification(notification));
        await showLocalNotification(notification);
      };

      socket.off("newNotification", handleNotification);
      socket.on("newNotification", handleNotification);

      cleanup = () => {
        socket.off("newNotification", handleNotification);
      };
    };

    attachListener();

    return () => {
      if (timeout) clearTimeout(timeout);
      cleanup?.();
    };
  }, [dispatch]);
};

