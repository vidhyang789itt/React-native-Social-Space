

import { useState } from 'react';

import { launchImageLibrary, Asset } from 'react-native-image-picker';

interface PostFormFields {
  initialTitle: string;

  initialContent: string;

  onSubmit: (
    title: string,
    content: string,
    mediaFiles?: any[],
  ) => Promise<void>;
}

interface MediaPreview {
  file: any;

  preview: string;

  type: 'image' | 'video';
}

export const usePostForm = ({
  initialTitle,
  initialContent,
  onSubmit,
}: PostFormFields) => {
  const [title, setTitle] = useState<string>(initialTitle || '');

  const [content, setContent] = useState<string>(initialContent || '');

  const [mediaFiles, setMediaFiles] = useState<any[]>([]);

  const [mediaPreview, setMediaPreview] = useState<MediaPreview[]>([]);

  const [error, setError] = useState('');

  const handlePickMedia = async () => {
    try {
      const result = await launchImageLibrary({
        mediaType: 'mixed',

        selectionLimit: 10,

        quality: 1,

        videoQuality: 'high',
      });

      if (result.didCancel || !result.assets) {
        return;
      }

      const newAssets = result.assets;

      const allowedImageTypes = [
        'image/jpeg',
        'image/png',
        'image/gif',
        'image/webp',
      ];

      const allowedVideoTypes = [
        'video/mp4',
        'video/webm',
        'video/ogg',
        'video/quicktime',
      ];

      for (const asset of newAssets) {
        const fileType = asset.type || '';

        const isImage = allowedImageTypes.includes(fileType);

        const isVideo = allowedVideoTypes.includes(fileType);

        if (!isImage && !isVideo) {
          setError(`${asset.fileName} is not supported`);

          return;
        }

        const maxSize = isVideo ? 100 * 1024 * 1024 : 10 * 1024 * 1024;

        if ((asset.fileSize || 0) > maxSize) {
          setError(`${asset.fileName} is too large`);
          return;
        }

        const mediaObject: MediaPreview = {
        file: asset,

        preview:
            asset.uri || "",

        type: isImage
            ? "image"
            : "video",
        };

        setMediaPreview((prev) => [
        ...prev,
        mediaObject,
]);
        setMediaFiles(prev => [...prev, asset]);
      }

      setError('');
    } catch (err) {
      console.log('MEDIA PICK ERROR:', err);

      setError('Failed to pick media');
    }
  };


  const removeMedia = (index: number) => {
    setMediaPreview(prev => prev.filter((_, i) => i !== index));

    setMediaFiles(prev => prev.filter((_, i) => i !== index));
  };


  const validateAndSubmit = async () => {
    const trimmedTitle = String(title).trim();

    const trimmedContent = String(content).trim();

    if (!trimmedTitle) {
      setError('Title is required');
      return;
    }

    if (trimmedTitle.length > 120) {
      setError('Title must be 120 characters or less');
      return;
    }

    if (!trimmedContent) {
      setError('Content is required');
      return;
    }

    if (trimmedContent.length > 5000) {
      setError('Content must be 5000 characters or less');
      return;
    }

    setError('');

    try {
      await onSubmit(
        trimmedTitle,
        trimmedContent,
        mediaFiles.length > 0 ? mediaFiles : undefined,
      );
    } catch (err) {
      console.error('Submit error:', err);
      setError(err instanceof Error ? err.message : 'Failed to submit post');
      throw err;
    }
  };

  const clearAllMedia = () => {
    setMediaPreview([]);
    setMediaFiles([]);
  };

  return {
    title,
    setTitle,
    content,
    setContent,
    mediaFiles,
    mediaPreview,
    error,
    setError,
    handlePickMedia,
    removeMedia,
    clearAllMedia,
    validateAndSubmit,
  };
};
