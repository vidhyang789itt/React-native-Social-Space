

import React from "react";

import {
  View,
  Text,
} from "react-native";
import { createStyles } from "./style";
import { useAppTheme } from "../../../theme/ThemeContext";


interface Props {
  isEdit?: boolean;
}

export const FormHeader = ({
  isEdit,
}: Props) => {
  const { theme } = useAppTheme();
const styles = createStyles(theme);


  return (
    <View style={styles.container}>

      <Text style={styles.title}>
        {isEdit
          ? "Edit Post"
          : "Create Post"}
      </Text>

      <Text style={styles.subtitle}>
        Share something with community
      </Text>

    </View>
  );
};