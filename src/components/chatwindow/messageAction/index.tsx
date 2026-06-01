import React, { useRef, useEffect, useState } from "react";
import {
  View,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  Animated,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {
  canDeleteForEveryone,
  getTimeRemainingToDelete,
  formatTimeRemaining,
} from "../../../utils/messageTime";
import { useAppTheme } from "../../../theme/ThemeContext";
import { createStyles } from "./style";


interface MessageActionsProps {
  messageId: string;
  senderId: string;
  currentUserId: string;
  isMe: boolean;
  messageCreatedAt: string;
  messageContent: string;
  senderName: string;
  onDeleteForMe: () => void;
  onDeleteForAll: () => void;
  onReply: (messageId: string, senderName: string, content: string) => void;
  onOpenChange?: (isOpen: boolean) => void;
}

export const MessageActions: React.FC<MessageActionsProps> = ({
  messageId,
  senderId,
  currentUserId,
  isMe,
  messageCreatedAt,
  messageContent,
  senderName,
  onDeleteForMe,
  onDeleteForAll,
  onReply,
  onOpenChange,
}) => {
  const [showMenu, setShowMenu] = useState(false);
  const [canDelete, setCanDelete] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState<number>(0);
  const { theme } = useAppTheme();
  const styles = createStyles(theme);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const scaleAnim = useRef(new Animated.Value(0)).current;

  const isSender = senderId === currentUserId;

  useEffect(() => {
    const checkDeletePermission = () => {
      const canDeleteNow = canDeleteForEveryone(messageCreatedAt);
      setCanDelete(canDeleteNow);

      if (!canDeleteNow) {
        const remaining = getTimeRemainingToDelete(messageCreatedAt);
        setTimeRemaining(remaining);
      }
    };

    checkDeletePermission();

    timerRef.current = setInterval(checkDeletePermission, 1000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [messageCreatedAt]);

  useEffect(() => {
    onOpenChange?.(showMenu);

    if (showMenu) {
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(scaleAnim, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }).start();
    }
  }, [showMenu, onOpenChange, scaleAnim]);

  const handleReply = () => {
    onReply(messageId, senderName, messageContent);
    setShowMenu(false);
  };

  const handleDeleteForMe = () => {
    onDeleteForMe();
    setShowMenu(false);
  };

  const handleDeleteForAll = () => {
    onDeleteForAll();
    setShowMenu(false);
  };

  const menuScale = scaleAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.8, 1],
  });

  const menuOpacity = scaleAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 0.3, 1],
  });
  return (
    <View style={styles.actionContainer}>
      <TouchableOpacity
        onPress={() => setShowMenu(true)}
        activeOpacity={0.7}
        style={[
          styles.actionButton,
          showMenu && styles.actionButtonActive,
        ]}
        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
      >
        <Text style={styles.dotsText}>⋮</Text>
      </TouchableOpacity>

      <Modal
        visible={showMenu}
        transparent
        animationType="fade"
        onRequestClose={() => setShowMenu(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setShowMenu(false)}
        >
          <Animated.View
            style={[
              styles.dropdownMenu,
              isMe ? styles.dropdownMenuRight : styles.dropdownMenuLeft,
              {
                transform: [{ scale: menuScale }],
                opacity: menuOpacity,
              },
            ]}
          >
            <TouchableOpacity
              onPress={handleReply}
              activeOpacity={0.7}
              style={styles.menuItem}
            >
              <Ionicons
                name="arrow-undo"
                size={16}
                color="#5b5ce2"
                style={{ marginRight: 10 }}
              />
              <Text style={styles.menuItemText}>Reply</Text>
            </TouchableOpacity>

            <View style={styles.menuDivider} />

            <TouchableOpacity
              onPress={handleDeleteForMe}
              activeOpacity={0.7}
              style={styles.menuItem}
            >
              <MaterialCommunityIcons
                name="trash-can-outline"
                size={16}
                color="#ef4444"
                style={{ marginRight: 10 }}
              />
              <Text style={styles.menuItemText}>Delete for me</Text>
            </TouchableOpacity>

            {isSender && (
              <>
                <View style={styles.menuDivider} />

                {canDelete ? (
                  <TouchableOpacity
                    onPress={handleDeleteForAll}
                    activeOpacity={0.7}
                    style={[styles.menuItem, styles.menuItemDanger]}
                  >
                    <MaterialCommunityIcons
                      name="trash-can"
                      size={16}
                      color="#dc2626"
                      style={{ marginRight: 10 }}
                    />
                    <Text style={styles.menuItemTextDanger}>
                      Delete for everyone
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <View
                    style={[styles.menuItem, styles.menuItemDisabled]}
                    pointerEvents="none"
                  >
                    <Ionicons
                      name="time"
                      size={16}
                      color="#cbd5e1"
                      style={{ marginRight: 10 }}
                    />
                    <View style={{ flex: 1 }}>
                      <Text style={styles.menuItemTextDisabled}>
                        Delete for everyone
                      </Text>
                      <Text style={styles.timeRemaining}>
                        Available in {formatTimeRemaining(timeRemaining)}
                      </Text>
                    </View>
                  </View>
                )}
              </>
            )}
          </Animated.View>
        </Pressable>
      </Modal>
    </View>
  );
}