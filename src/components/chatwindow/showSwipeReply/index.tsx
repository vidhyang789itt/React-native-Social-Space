import React, { useState, useEffect, forwardRef, useRef } from "react";
import {
  View
} from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";
import Ionicons from "react-native-vector-icons/Ionicons";
import { StyleSheet } from "react-native";
import { useAppTheme } from "../../../theme/ThemeContext";
import { createStyles } from "./style";

interface SwipeReplyRowProps {
  isMe: boolean;
  children: React.ReactNode;
  onSwipeReply: () => void;
}

const SwipeReplyRow: React.FC<SwipeReplyRowProps> = ({
  isMe,
  children,
  onSwipeReply,
}) => {
  const swipeableRef = useRef<Swipeable>(null);
    const { theme } = useAppTheme();
    const styles = createStyles(theme);
  const handleSwipeOpen = () => {
    onSwipeReply();

    setTimeout(() => {
      swipeableRef.current?.close();
    }, 120);
  };

  const renderReplyAction = () => (
    <View
      style={[
        styles.swipeReplyAction,
        isMe ? styles.swipeReplyActionMe : styles.swipeReplyActionOther,
      ]}
    >
      <View style={styles.swipeReplyIconBubble}>
        <Ionicons name="arrow-undo" size={20} color="#5b5ce2" />
      </View>
    </View>
  );

  return (
    <Swipeable
      ref={swipeableRef}
      friction={2}
      overshootLeft={false}
      overshootRight={false}
      leftThreshold={42}
      rightThreshold={42}
      renderLeftActions={!isMe ? renderReplyAction : undefined}
      renderRightActions={isMe ? renderReplyAction : undefined}
      onSwipeableOpen={handleSwipeOpen}
    >
      {children}
    </Swipeable>
  );
};


export default SwipeReplyRow;