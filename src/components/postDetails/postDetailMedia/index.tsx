import React from "react";
import { PostMedia } from "../../post/postMedia";

interface Props {
  media: any[];
  BASE_URL: string;
}

export const PostDetailMedia = ({
  media,
}: Props) => {
  if (!media || media.length === 0) {
    return null;
  }

  return (
    <PostMedia
      post={{
        media,
      } as any}
    />
  );
};