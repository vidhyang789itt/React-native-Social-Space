import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import type { ConversationType } from "../../../types/conversation.type";
import { createStyles } from "./style";
import { useAppTheme } from "../../../theme/ThemeContext";


interface ChatHeaderProps {
  isDirect: boolean;
  isGroup: boolean;
  groupName?: string;
  otherUser?: any;
  isOnline: boolean;
  activeConversation?: ConversationType | null;
  onBackPress: () => void;
  onNavigateProfile: () => void;
  onOpenGroupSettings: () => void;
  getFullUrl: (url: string) => string;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({
  isDirect,
  isGroup,
  groupName = "Chat",
  otherUser,
  isOnline,
  activeConversation,
  onBackPress,
  onNavigateProfile,
  onOpenGroupSettings,
  getFullUrl,
}) => {
  const profileImageUrl = isGroup
    ? activeConversation?.type === "group" && activeConversation?.groupImage
      ? getFullUrl(activeConversation.groupImage)
      : require("../../../assests/group_image.webp")
    : isDirect && otherUser?.profileUrl
      ? getFullUrl(otherUser.profileUrl)
      : require("../../../assests/temp_profile.png");
  const { theme } = useAppTheme();
  const styles = createStyles(theme);

  const statusText = isGroup
    ? `${activeConversation?.groupMembers?.length || 0} members`
    : isOnline
      ? "Active Now"
      : "Offline";

  const statusColor = isDirect && isOnline ? "#22c55e" : "#94a3b8";

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={onBackPress}
        activeOpacity={0.7}
        style={styles.backButton}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 6 }}
      >
        <Ionicons name="chevron-back" size={26} color={theme.colors.text} />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={onNavigateProfile}
        disabled={!isDirect}
        activeOpacity={isDirect ? 0.7 : 1}
        style={styles.userInfoContainer}
      >
        <View style={styles.avatarWrapper}>
          <Image
            source={
              typeof profileImageUrl === "string"
                ? { uri: profileImageUrl }
                : profileImageUrl
            }
            style={[
              styles.avatar,
              isDirect &&
                isOnline && {
                  borderColor: "#22c55e",
                  borderWidth: 2,
                },
            ]}
            defaultSource={require("../../../assests/temp_profile.png")}
          />
          {isDirect && isOnline && <View style={styles.onlineIndicator} />}
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.nameText} numberOfLines={1} ellipsizeMode="tail">
            {groupName}
          </Text>
          <Text style={[styles.statusText, { color: statusColor }]}>
            {statusText}
          </Text>
        </View>
      </TouchableOpacity>

      {isGroup && (
        <TouchableOpacity
          onPress={onOpenGroupSettings}
          activeOpacity={0.7}
          style={styles.settingsButton}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons name="settings-outline" size={22} color={theme.colors.textMuted} />
        </TouchableOpacity>
      )}
    </View>
  );
};


export default ChatHeader;
