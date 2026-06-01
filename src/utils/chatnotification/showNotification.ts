import { AppState } from "react-native";
import notifee, { AndroidImportance, AuthorizationStatus } from "@notifee/react-native";
import { getChatNotificationText, getChatNotificationTitle } from "./chatNotificationGenerator";

const CHANNEL_ID = "socialspace-chat";

const ensurePermission = async () => {
  const settings = await notifee.requestPermission();

  return (
    settings.authorizationStatus === AuthorizationStatus.AUTHORIZED ||
    settings.authorizationStatus === AuthorizationStatus.PROVISIONAL
  );
};

const ensureChannel = async () => {
  return notifee.createChannel({
    id: CHANNEL_ID,
    name: "SocialSpace Chats",
    importance: AndroidImportance.HIGH,
    sound: "default",
    vibration: true,
  });
};

export const showChatNotification = async (message: any, groupName?: string) => {
  if (AppState.currentState !== "active") return;

  const allowed = await ensurePermission();
  if (!allowed) return;

  const channelId = await ensureChannel();

  await notifee.displayNotification({
    title: getChatNotificationTitle(message, groupName),
    body: getChatNotificationText(message),
    android: {
      channelId,
      smallIcon: "ic_launcher",
      pressAction: {
        id: "default",
      },
    },
  });
};
