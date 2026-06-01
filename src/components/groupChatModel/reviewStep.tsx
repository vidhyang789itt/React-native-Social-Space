import React from "react";
import {
  View,
  Text,
  Image,
} from "react-native";
import { styles } from "./style";

interface Props {
  groupName: string;
  groupDescription: string;
  groupImage: string;
  members: any[];
}

export const ReviewStep = ({
  groupName,
  groupDescription,
  groupImage,
  members,
}: Props) => {
  return (
    <View>
      {groupImage ? (
        <Image
          source={{ uri: groupImage }}
          style={styles.reviewImage}
        />
      ) : null}

      <Text style={styles.reviewTitle}>
        {groupName}
      </Text>

      {groupDescription ? (
        <Text style={styles.reviewDescription}>
          {groupDescription}
        </Text>
      ) : null}

      <Text style={styles.reviewMembers}>
        {members.length} members selected
      </Text>
    </View>
  );
};