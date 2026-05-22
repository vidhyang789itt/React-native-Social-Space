import { Asset } from "react-native-image-picker";

export interface Author {
  _id: string;
  userId: string;
  username: string;
  profileUrl: string;
}

export interface Media {
  _id?: string;
  type: "image" | "video";
  url: string;
  filename: string;
  uploadedAt?: string;
}

export interface Post {
  _id: string;
  postId: string;
  title: string;
  content: string;
  author: Author;
  media: Media[];
  imageUrl?: string; 
  likes: string[];
  comments: string[];
  createdAt: string;
  updatedAt: string;
}

export interface CreatePostPayload {
  title: string;
  content: string;
  media?: Asset[];
}

export interface UpdatePostPayload {
  postId: string;
  title: string;
  content: string;
}

export interface UpdatePostMediaPayload {
  postId: string;
  media?: Asset[];
  removeMediaIds?: string[];
}