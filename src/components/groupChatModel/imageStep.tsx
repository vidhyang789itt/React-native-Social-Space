import React from "react";
import {
  View,
  Image,
  TouchableOpacity,
  Text,
} from "react-native";
import { styles } from "./style";

interface Props {
  imageUri: string;
  onPickImage: () => void;
}

export const ImageStep = ({
  imageUri,
  onPickImage,
}: Props) => {
  return (
    <View style={styles.imageStepContainer}>
      <TouchableOpacity
        style={styles.imagePicker}
        onPress={onPickImage}
      >
        {imageUri ? (
          <Image
            source={{ uri: imageUri }}
            style={styles.groupImage}
          />
        ) : (
          <Text style={styles.imagePickerText}>
            Select Group Image
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
};