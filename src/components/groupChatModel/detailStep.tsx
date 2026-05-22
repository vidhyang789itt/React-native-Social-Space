import React from "react";
import {
  View,
  Text,
  TextInput,
} from "react-native";
import { styles } from "./style";

interface Props {
  groupName: string;
  setGroupName: (value: string) => void;
  groupDescription: string;
  setGroupDescription: (value: string) => void;
}

export const DetailsStep = ({
  groupName,
  setGroupName,
  groupDescription,
  setGroupDescription,
}: Props) => {
  return (
    <View>
      <Text style={styles.label}>
        Group Name
      </Text>
      <TextInput
        value={groupName}
        onChangeText={setGroupName}
        placeholder="Enter group name"
        style={styles.input}
      />

      <Text style={styles.label}>
        Description
      </Text>
      <TextInput
        value={groupDescription}
        onChangeText={setGroupDescription}
        placeholder="Enter description"
        multiline
        style={styles.textArea}
      />
    </View>
  );
};