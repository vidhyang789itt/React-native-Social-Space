import React from "react";

import {
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import { PostForm } from "../../components/createPost/postForm";
import { usePostSubmit } from "./usePostCreate";
import { styles } from "./style";

export const CreatePostScreen = () => {
  const navigation = useNavigation<any>();
  const {
    handleSubmit,
    loading,
  } = usePostSubmit({
    mode: "create",

    onSuccess: () => {
      navigation.navigate("Main", {
        screen: "Home",
      });
    },

    onClose: () => {
      navigation.navigate("Home");
    },
  });

  const handleClose = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>

      <KeyboardAvoidingView
        behavior={
          Platform.OS === "ios"
            ? "padding"
            : undefined
        }
        style={styles.flex}
      >

        <PostForm
          onSubmit={handleSubmit}
          loading={loading}
          isEdit={false}
          onClose={handleClose}
        />

      </KeyboardAvoidingView>

    </SafeAreaView>
  );
};