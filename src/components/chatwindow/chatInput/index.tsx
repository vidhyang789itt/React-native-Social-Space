import React, { useEffect, useRef } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Animated,
  Alert,
  Keyboard,
  Easing,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { launchImageLibrary, ImageLibraryOptions } from "react-native-image-picker";
import { useAppTheme } from "../../../theme/ThemeContext";
import { createStyles } from "./style";


interface ChatInputProps {
  isUploading: boolean;
  mediaFiles: { name: string; uri: string; type: string }[];
  fileInputRef: React.RefObject<any>;
  inputRef: React.RefObject<TextInput | null>;
  onFileSelect: (files: { name: string; uri: string; type: string }[]) => void;
  onSend: (messageText: string) => void;
  onKeyboardHeightChange?: (height: number) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({
  isUploading,
  mediaFiles,
  fileInputRef,
  inputRef,
  onFileSelect,
  onSend,
  onKeyboardHeightChange
}) => {
  const [text, setText] = React.useState("");
  const uploadButtonScale = useRef(new Animated.Value(1)).current;
  const sendButtonScale = useRef(new Animated.Value(1)).current;
  const { theme } = useAppTheme();
  const styles = React.useMemo(() => createStyles(theme), [theme]);
  const keyboardOffset = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const showSub = Keyboard.addListener("keyboardDidShow", (event) => {
      Animated.timing(keyboardOffset, {
        toValue: -event.endCoordinates.height,
        duration: 220,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }).start();
      onKeyboardHeightChange?.(event.endCoordinates.height);
    });

    const hideSub = Keyboard.addListener("keyboardDidHide", () => {
      Animated.timing(keyboardOffset, {
        toValue: 0,
        duration: 200,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }).start();
      onKeyboardHeightChange?.(0);
    });

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, [keyboardOffset]);


  const handleUploadPress = async () => {
    if (isUploading) return;

    try {
      const options: ImageLibraryOptions = {
        mediaType: "mixed",
        selectionLimit: 5,
        quality: 0.8,
        includeBase64: false,
      };

      launchImageLibrary(options, (response) => {
        if (response.didCancel) {
          console.log("User cancelled image picker");
        } else if (response.errorCode) {
          console.error("Image picker error:", response.errorMessage);
          Alert.alert("Error", "Failed to pick media");
        } else if (response.assets && response.assets.length > 0) {
          const selectedFiles = response.assets.map((asset: any) => ({
            name: asset.fileName || `photo_${Date.now()}`,
            uri: asset.uri || "",
            type: asset.type || "image/jpeg",
          }));
          onFileSelect(selectedFiles);
        }
      });
    } catch (error) {
      console.error("Error picking media:", error);
      Alert.alert("Error", "Failed to pick media");
    }
  };

  const handleDocumentPick = async () => {
    if (isUploading) return;

    try {
      const options: ImageLibraryOptions = {
        mediaType: "mixed",
        selectionLimit: 5,
        quality: 0.8,
        includeBase64: false,
      };

      launchImageLibrary(options, (response) => {
        if (response.didCancel) {
          console.log("User cancelled image picker");
        } else if (response.errorCode) {
          console.error("Image picker error:", response.errorMessage);
          Alert.alert("Error", "Failed to pick documents");
        } else if (response.assets && response.assets.length > 0) {
          const selectedFiles = response.assets.map((asset: any) => ({
            name: asset.fileName || `document_${Date.now()}`,
            uri: asset.uri || "",
            type: asset.type || "application/octet-stream",
          }));
          onFileSelect(selectedFiles);
        }
      });
    } catch (error) {
      console.error("Error picking documents:", error);
      Alert.alert("Error", "Failed to pick documents");
    }
  };

  const animateButton = (scale: Animated.Value, toValue: number) => {
    Animated.spring(scale, {
      toValue,
      useNativeDriver: true,
      tension: 100,
      friction: 10,
    }).start();
  };

  const isInputDisabled = isUploading;
  const isSendDisabled =
    (!text.trim() && mediaFiles.length === 0) || isUploading;

  return (
    <View style={styles.keyboardAvoidingView}>
      <View style={styles.inputContainer}>
        {}
        <Animated.View
          style={[
            styles.buttonWrapper,
            {
              transform: [{ scale: uploadButtonScale }],
            },
          ]}
        >
          <TouchableOpacity
            onPress={() => {
              Alert.alert(
                "Select Media",
                "Choose what to upload",
                [
                  {
                    text: "Photos & Videos",
                    onPress: handleUploadPress,
                  },
                  {
                    text: "Documents",
                    onPress: handleDocumentPick,
                  },
                  {
                    text: "Cancel",
                    style: "cancel",
                  },
                ],
                { cancelable: true }
              );
            }}
            disabled={isInputDisabled}
            activeOpacity={0.7}
            onPressIn={() => animateButton(uploadButtonScale, 0.9)}
            onPressOut={() => animateButton(uploadButtonScale, 1)}
            style={[
              styles.iconButton,
              isInputDisabled && styles.iconButtonDisabled,
            ]}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            {isUploading ? (
              <ActivityIndicator size="small" color="#8b5cf6" />
            ) : (
              <MaterialCommunityIcons
                name="paperclip"
                size={20}
                color={isInputDisabled ? theme.colors.textSoft : theme.colors.textMuted}
              />
            )}
          </TouchableOpacity>
        </Animated.View>

        {}
        <TextInput
          ref={inputRef}
          value={text}
          onChangeText={setText}
          placeholder="Type a message..."
          placeholderTextColor="#94a3b8"
          editable={!isInputDisabled}
          multiline
          maxLength={1000}
          style={[
            styles.textInput,
            isInputDisabled && styles.textInputDisabled,
          ]}
        />

        {}
        <Animated.View
          style={[
            styles.buttonWrapper,
            {
              transform: [{ scale: sendButtonScale }],
            },
          ]}
        >
          <TouchableOpacity
            onPress={() => {
              onSend(text);
              setText("");
            }}
            disabled={isSendDisabled}
            activeOpacity={0.7}
            onPressIn={() =>
              !isSendDisabled && animateButton(sendButtonScale, 0.9)
            }
            onPressOut={() =>
              !isSendDisabled && animateButton(sendButtonScale, 1)
            }
            style={[
              styles.iconButton,
              isSendDisabled && styles.iconButtonDisabled,
            ]}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            {isUploading ? (
              <ActivityIndicator size="small" color="#8b5cf6" />
            ) : (
              <MaterialCommunityIcons
                name="send"
                size={20}
                color={isSendDisabled ? theme.colors.textSoft : theme.colors.primary}
              />
            )}
          </TouchableOpacity>
        </Animated.View>
      </View>
    </View>
  );
};



export default ChatInput;