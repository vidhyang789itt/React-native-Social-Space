

import React from "react";
import {
  TouchableOpacity,
  Text,
} from "react-native";

import { useDispatch, useSelector } from "react-redux";

import {
  followUser,
  unfollowUser,
} from "../../../store/slices/userSlice";

import type {
  RootState,
  AppDispatch,
} from "../../../store/store";
import { useAppTheme } from "../../../theme/ThemeContext";
import { createStyles } from "./style";


interface FollowActionProps {
  targetUser: {
    _id: string;
    userId: string;
    followers: string[];
  };
}

export const FollowAction = ({
  targetUser,
}: FollowActionProps) => {
  const { theme } = useAppTheme(); 
  const styles = createStyles(theme);
  const dispatch = useDispatch<AppDispatch>();

  const { user: currentUser } = useSelector(
    (state: RootState) => state.auth
  );

  if (
    !currentUser ||
    currentUser._id === targetUser._id
  ) {
    return null;
  }

  const isFollowing =
    targetUser.followers.includes(
      currentUser._id
    );

  const handleToggleFollow = () => {

    const payload = {
      targetUserId: targetUser.userId,
      currentUserId: currentUser._id,
    };

    if (isFollowing) {
      dispatch(unfollowUser(payload));
    } else {
      dispatch(followUser(payload));
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={handleToggleFollow}
      style={[
        styles.button,

        isFollowing
          ? styles.followingButton
          : styles.followButton,
      ]}
    >
      <Text
        style={[
          styles.buttonText,

          isFollowing &&
            styles.followingButtonText,
        ]}
      >
        {isFollowing
          ? "Following"
          : "Follow"}
      </Text>
    </TouchableOpacity>
  );
};