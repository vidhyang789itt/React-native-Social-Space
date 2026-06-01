import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";

import Icon from "react-native-vector-icons/Feather";
import { formatDistanceToNow } from "date-fns";
import { useAppTheme } from "../../../theme/ThemeContext";
import { createStyles } from "../style";
import { useNavigation } from "@react-navigation/native";
import { getMediaUrl } from "../../../utils/getMediaUrl";


interface Props {
  post: any;
  isOwner: boolean;
  BASE_URL: string;
  onBack: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export const PostDetailHeader = ({
  post,
  isOwner,
  BASE_URL,
  onBack,
  onEdit,
  onDelete,
}: Props) => {
  const navigation = useNavigation<any>();
  const profileUri =
    post.author?.profileUrl
      ? getMediaUrl(post.author.profileUrl)
      : undefined;
  const { theme } = useAppTheme();
  const styles = createStyles(theme);

  return (
    <>
      <TouchableOpacity
        style={styles.backButton}
        onPress={onBack}
      >
        <Icon
          name="arrow-left"
          size={18}
          color="#7C3AED"
        />
        <Text style={styles.backText}>
          Back
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() =>
          navigation.getParent()?.navigate("UserProfile", {
            userId: post.author?._id,
          })
        }
      >
        <View style={styles.header}>
          <View style={styles.authorSection}>
            <Image
              source={
                profileUri
                  ? { uri: profileUri }
                  : require("../../../assests/temp_profile.webp")
              }
              style={styles.avatar}
            />

            <View style={styles.authorInfo}>
              <Text style={styles.authorName}>
                {post.author?.username}
              </Text>

              <Text style={styles.postTime}>
                {post.createdAt
                  ? formatDistanceToNow(
                    new Date(post.createdAt),
                    {
                      addSuffix: true,
                    }
                  )
                  : "Just now"}
              </Text>
            </View>
          </View>


          {isOwner && (
            <View
              style={
                styles.ownerActions
              }
            >
              <TouchableOpacity
                style={
                  styles.iconButton
                }
                onPress={onEdit}
              >
                <Icon
                  name="edit-2"
                  size={18}
                  color="#7C3AED"
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={
                  styles.iconButton
                }
                onPress={
                  onDelete
                }
              >
                <Icon
                  name="trash-2"
                  size={18}
                  color="#EF4444"
                />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </TouchableOpacity>
    </>
  );
};