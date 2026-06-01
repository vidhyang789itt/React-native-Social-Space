import React, { useEffect, useState, useMemo, useCallback } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  ScrollView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchNotifications,
  markAllAsRead,
  markNotificationAsRead,
} from "../../store/slices/notificationSlice";
import type { RootState, AppDispatch } from "../../store/store";
import { formatDistanceToNow } from "date-fns";
import { Heart, MessageSquare, UserPlus, Bell } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";
import type { NotificationType } from "../../types/notification.type";
import { groupNotificationsByDate } from "../../utils/NotificationGroup";
import { BASE_URL } from "../../constants/ApiRoutes";
import { useAppTheme } from "../../theme/ThemeContext";
import { createStyles } from "./style";

const FILTERS = ["ALL", "LIKE", "COMMENT", "FOLLOW"];

const renderTypeIcon = (type: string) => {
  switch (type) {
    case "LIKE":
      return <Heart size={14} fill="#ef4444" color="#ef4444" />;
    case "COMMENT":
      return <MessageSquare size={14} fill="#3b82f6" color="#3b82f6" />;
    case "FOLLOW":
      return <UserPlus size={14} color="#10b981" />;
    default:
      return null;
  }
};


const NotificationItem = React.memo(({
  n,
  styles,
  getImageUrl,
  onPress,
  navigation,
}: {
  n: NotificationType;
  styles: any;
  getImageUrl: (url?: string) => string | undefined;
  onPress: (n: NotificationType) => void;
  navigation: any;
}) => {
  const handlePress = useCallback(() => {
    onPress(n);
  }, [onPress, n]);

  const handlePostThumbnailPress = useCallback((e: any) => {
    e.stopPropagation();
    if (n.referenceId?.postId) {
      navigation.navigate("PostDetails", {
        postId: n.referenceId.postId,
      });
    }
  }, [navigation, n.referenceId?.postId]);

  const renderMessage = () => {
    if (n.type === "COMMENT") {
      const content = n.content || "";
      return (
        <Text style={styles.message}>
          <Text style={styles.username}>{n.sender.username}</Text>
          {" commented on your post: "}
          <Text style={styles.commentText}>
            "{content.substring(0, 40)}
            {content.length > 40 ? "..." : ""}"
          </Text>
        </Text>
      );
    }

    if (n.type === "LIKE") {
      return (
        <Text style={styles.message}>
          <Text style={styles.username}>{n.sender.username}</Text>
          {" liked your post"}
        </Text>
      );
    }

    if (n.type === "FOLLOW") {
      return (
        <Text style={styles.message}>
          <Text style={styles.username}>{n.sender.username}</Text>
          {" started following you"}
        </Text>
      );
    }

    return (
      <Text style={styles.message}>
        <Text style={styles.username}>{n.sender.username}</Text>
        {" "}
        {n.content}
      </Text>
    );
  };

  return (
    <TouchableOpacity
      activeOpacity={0.75}
      onPress={handlePress}
      style={[styles.notificationItem, !n.isRead && styles.unreadItem]}
    >
      <View style={styles.avatarWrapper}>
        <Image
          source={
            n.sender.profileUrl
              ? { uri: getImageUrl(n.sender.profileUrl) }
              : require("../../assests/temp_profile.webp")
          }
          style={styles.avatar}
        />

        <View style={styles.typeIconWrapper}>{renderTypeIcon(n.type)}</View>
      </View>

      <View style={styles.content}>
        {renderMessage()}
        <Text style={styles.time}>
          {formatDistanceToNow(new Date(n.createdAt))} ago
        </Text>
      </View>

      {(n.type === "LIKE" || n.type === "COMMENT") &&
        n.referenceId?.imageUrl && (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={handlePostThumbnailPress}
          >
            <Image
              source={{ uri: getImageUrl(n.referenceId.imageUrl) }}
              style={styles.postThumbnail}
            />
          </TouchableOpacity>
        )}

      {!n.isRead && <View style={styles.unreadIndicator} />}
    </TouchableOpacity>
  );
});

NotificationItem.displayName = "NotificationItem";

const NotificationScreen = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation<any>();
  const { notifications, loading } = useSelector(
    (state: RootState) => state.notification
  );
  const { theme } = useAppTheme();
  
  
  const styles = useMemo(() => createStyles(theme), [theme]);
  const [filter, setFilter] = useState("ALL");

  useEffect(() => {
    dispatch(fetchNotifications());
  }, [dispatch]);

  
  const filtered = useMemo(() => {
    return (notifications ?? []).filter(
      (n) => filter === "ALL" || n.type === filter
    );
  }, [notifications, filter]);

  
  const groupedNotifications = useMemo(() => {
    return groupNotificationsByDate(filtered);
  }, [filtered]);

  const getImageUrl = useCallback((url?: string) => {
    if (!url) return undefined;
    if (url.startsWith("http")) return url;
    return `${BASE_URL}/${url}`;
  }, []);

  const handleNotificationClick = useCallback(async (notification: NotificationType) => {
    if (!notification.isRead) {
      dispatch(markNotificationAsRead(notification._id));
    }

    switch (notification.type) {
      case "COMMENT":
      case "LIKE":
        if (notification.referenceId?.postId) {
          navigation.navigate("PostDetails", {
            postId: notification.referenceId.postId,
          });
        }
        break;

      case "FOLLOW":
        navigation.navigate("UserProfile", {
          userId: notification.sender.userId,
        });
        break;

      default:
        break;
    }
  }, [dispatch, navigation]);

  const handleMarkAllRead = useCallback(() => {
    dispatch(markAllAsRead());
  }, [dispatch]);

  const renderSection = useCallback(({ item }: { item: any }) => (
    <View style={styles.notificationSection}>
      <Text style={styles.sectionHeader}>{item.label}</Text>
      {item.notifications.map((n: NotificationType) => (
        <NotificationItem
          key={n._id}
          n={n}
          styles={styles}
          getImageUrl={getImageUrl}
          onPress={handleNotificationClick}
          navigation={navigation}
        />
      ))}
    </View>
  ), [styles, getImageUrl, handleNotificationClick, navigation]);

  return (
    <View style={styles.pageWrapper}>
      <View style={styles.header}>
        <Text style={styles.title}>Notifications</Text>

        <TouchableOpacity
          activeOpacity={0.75}
          onPress={handleMarkAllRead}
          style={styles.markReadButton}
        >
          <Text style={styles.markReadText}>Mark all as read</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.filterSection}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterScrollContent}
        >
          {FILTERS.map((tab) => (
            <TouchableOpacity
              key={tab}
              activeOpacity={0.75}
              onPress={() => setFilter(tab)}
              style={[
                styles.filterTab,
                filter === tab && styles.filterTabActive,
              ]}
            >
              <Text
                style={[
                  styles.filterText,
                  filter === tab && styles.filterTextActive,
                ]}
              >
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {loading && notifications.length === 0 ? (
        <View style={styles.emptyState}>
          <ActivityIndicator size="large" color="#5b5ce2" />
          <Text style={styles.emptyText}>Loading notifications...</Text>
        </View>
      ) : filtered.length === 0 ? (
        <View style={styles.emptyState}>
          <Bell size={56} color="#94a3b8" />
          <Text style={styles.emptyText}>
            {notifications.length === 0
              ? "No notifications yet"
              : `No ${filter.toLowerCase()} notifications`}
          </Text>
        </View>
      ) : (
        <FlatList
          data={groupedNotifications}
          keyExtractor={(item) => item.label}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          renderItem={renderSection}
        />
      )}
    </View>
  );
};

export default NotificationScreen;

