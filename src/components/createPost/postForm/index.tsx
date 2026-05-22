

import React, { useEffect, useState } from "react";
import {
  View,
  ScrollView,
} from "react-native";

import { FormHeader } from "../formHeader";
import { PostInputs } from "../postInputs";
import { MediaPreview } from "../mediaPreview";
import { FormActions } from "../formActions";

import { usePostForm } from "../usePostForm";

import { createStyles } from "./style";
import { useAppTheme } from "../../../theme/ThemeContext";


interface ExistingMedia {
  _id?: string;
  url: string;
  type: "image" | "video";
}

interface Props {
  initialTitle?: string;
  initialContent?: string;

  initialMedia?: ExistingMedia[];

  onSubmit: (
    title: string,
    content: string,
    mediaFiles?: any[]
  ) => Promise<void>;

  loading?: boolean;
  isEdit?: boolean;
  onClose: () => void;

  onRemovedMedia?: (ids: string[]) => void;

  onExistingMediaChange?: (
    media: ExistingMedia[]
  ) => void;
}

export const PostForm = ({
  initialTitle = "",
  initialContent = "",
  initialMedia = [],
  onSubmit,
  loading,
  isEdit,
  onClose,
  onRemovedMedia,
  onExistingMediaChange,
}: Props) => {
  const { theme } = useAppTheme();
  const styles = createStyles(theme);
  const {
    title,
    setTitle,
    content,
    setContent,
    mediaPreview,
    error,
    setError,
    handlePickMedia,
    removeMedia,
    validateAndSubmit,
    clearAllMedia,
  } = usePostForm({
    initialTitle,
    initialContent,
    onSubmit,
  });

  const resetForm = () => {
    setTitle("");
    setContent("");
    setError("");
    clearAllMedia();
  };

  const handleCancel = () => {
    resetForm();
    onClose();
  };


  const [existingMedia, setExistingMedia] =
    useState<ExistingMedia[]>(initialMedia);

  const [removedMediaIds, setRemovedMediaIds] =
    useState<string[]>([]);

  const [currentMediaIndex, setCurrentMediaIndex] =
    useState(0);

  useEffect(() => {
    onRemovedMedia?.(removedMediaIds);
  }, [removedMediaIds]);

  useEffect(() => {
    onExistingMediaChange?.(existingMedia);
  }, [existingMedia]);

  const handleSubmit = async () => {
    try {
      await validateAndSubmit();
      resetForm();
    } catch (error) {
    }
  };

  const removeExistingMedia = (index: number) => {
    const mediaToRemove = existingMedia[index];

    if (mediaToRemove._id) {
      setRemovedMediaIds(prev => [
        ...prev,
        mediaToRemove._id!,
      ]);
    }

    setExistingMedia(prev =>
      prev.filter((_, i) => i !== index)
    );
  };

  return (
    <View style={styles.container}>
      <FormHeader isEdit={isEdit} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={
          styles.scrollContent
        }
      >
        <MediaPreview
          mediaPreview={mediaPreview}
          existingMedia={existingMedia}
          currentMediaIndex={currentMediaIndex}
          setCurrentMediaIndex={setCurrentMediaIndex}
          handlePickMedia={handlePickMedia}
          removeMedia={removeMedia}
          removeExistingMedia={removeExistingMedia}
        />

        <PostInputs
          title={title}
          setTitle={setTitle}
          content={content}
          setContent={setContent}
          error={error}
          setError={setError}
        />
      </ScrollView>

      <FormActions
        loading={loading}
        isEdit={isEdit}
        onClose={handleCancel}
        onSubmit={handleSubmit}
      />
    </View>
  );
};