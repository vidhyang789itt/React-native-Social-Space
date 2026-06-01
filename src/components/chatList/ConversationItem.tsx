import React, { memo, useMemo } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";

import { formatDistanceToNow } from "date-fns";

import { BASE_URL } from "../../constants/ApiRoutes";
import { createStyles } from "./style";
import { useAppTheme } from "../../theme/ThemeContext";
import { getMediaUrl } from "../../utils/getMediaUrl";

interface Props {
  conversation: any;
  currentUser: any;
  isOnline: boolean;
  onPress: (conversation: any) => void;
}

export const ConversationItem = memo(({
  conversation,
  currentUser,
  isOnline,
  onPress,
}: Props) => {
  const { theme } = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const isGroup =
    conversation.type ===
    "group";

  const participant =
    !isGroup
      ? conversation.user1
        ?.userId ===
        currentUser?.userId
        ? conversation.user2
        : conversation.user1
      : null;

  const displayName =
    isGroup
      ? conversation.groupName
      : participant?.username;

  const displayImage =
    isGroup
      ? conversation.groupImage
        ? getMediaUrl(conversation.groupImage)
        : undefined
      : participant?.profileUrl
        ? getMediaUrl(participant.profileUrl)
        : undefined;

  const unreadCount =
    isGroup
      ? conversation
        .groupUnreadCounts
        ?.find(
          (item: any) =>
            item._id ===
            currentUser?._id
        )?.unreadCount ||
      0
      : conversation.user1
        ?.userId ===
        currentUser?.userId
        ? conversation.unreadCountUser1 ||
        0
        : conversation.unreadCountUser2 ||
        0;

  const online = !isGroup && isOnline;

  return (
    <TouchableOpacity
      style={
        styles.conversationItem
      }
      onPress={() => onPress(conversation)}
      activeOpacity={0.85}
    >
      <View
        style={
          styles.avatarWrapper
        }
      >
        <Image
          source={
            displayImage
              ? {
                uri:
                  displayImage,
              }
              : isGroup
                ? require("../../assests/temp_profile.webp")
                : require("../../assests/temp_profile.webp")
          }
          style={
            styles.avatar
          }
        />

        {online && (
          <View
            style={
              styles.onlineDot
            }
          />
        )}

        {isGroup && (
          <View
            style={
              styles.groupDot
            }
          />
        )}
      </View>

      <View
        style={
          styles.content
        }
      >
        <Text
          numberOfLines={1}
          style={
            styles.name
          }
        >
          {displayName}
        </Text>

        <Text
          numberOfLines={1}
          style={[
            styles.lastMessage,
            unreadCount >
            0 &&
            styles.unreadMessage,
          ]}
        >
          {conversation.lastMessage ||
            "Start a conversation"}
        </Text>
      </View>

      <View
        style={
          styles.metaSection
        }
      >
        <Text
          style={
            styles.time
          }
        >
          {formatDistanceToNow(
            new Date(
              conversation.updatedAt
            ),
            {
              addSuffix:
                false,
            }
          )}
        </Text>

        {unreadCount >
          0 && (
            <View
              style={
                styles.unreadBadge
              }
            >
              <Text
                style={
                  styles.unreadBadgeText
                }
              >
                {unreadCount >
                  9
                  ? "9+"
                  : unreadCount}
              </Text>
            </View>
          )}
      </View>
    </TouchableOpacity>
  );
});

ConversationItem.displayName = "ConversationItem";