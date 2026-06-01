

import React, { use } from "react";

import {
  View,
  Text,
  TextInput,
} from "react-native";
import { useAppTheme } from "../../../theme/ThemeContext";
import { createStyles } from "./style";

interface Props {
  title: string;
  setTitle: (v: string) => void;

  content: string;
  setContent: (v: string) => void;

  error: string;
  setError: (v: string) => void;
}

export const PostInputs = ({
  title,
  setTitle,

  content,
  setContent,

  error,
}: Props) => {
  const { theme } = useAppTheme();
const styles = createStyles(theme);


  return (
    <View>

      <View style={styles.group}>

        <Text style={styles.label}>
          Title
        </Text>

        <TextInput
          placeholder="Give your post a title..."
          placeholderTextColor="#9CA3AF"
          value={title}
          onChangeText={setTitle}
          style={styles.input}
          maxLength={100}
        />

        <Text style={styles.count}>
          {title.length}/100
        </Text>

      </View>

      <View style={styles.group}>

        <Text style={styles.label}>
          Content
        </Text>

        <TextInput
          placeholder="Write something..."
          placeholderTextColor="#9CA3AF"

          multiline

          value={content}
          onChangeText={setContent}

          style={styles.textArea}

          textAlignVertical="top"

          maxLength={5000}
        />

        <Text style={styles.count}>
          {content.length}/5000
        </Text>

      </View>

      {error ? (
        <Text style={styles.error}>
          {error}
        </Text>
      ) : null}

    </View>
  );
};