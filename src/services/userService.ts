import { fetchClient } from "./fetchClient";
import { API_ROUTES } from "../constants/ApiRoutes";
import type { User } from "../types/user.types";

export const getProfileApi = (url: string) => {
  return fetchClient<{ user: User }>(url, {
    method: "GET",
    requireAuth: true,
  });
};

export const editProfileApi = (userData: {
  username: string;
  email: string;
}) => {
  return fetchClient<User>(API_ROUTES.UPDATE_PROFILE, {
    method: "PUT",
    requireAuth: true,
    body: JSON.stringify(userData),
  });
};

export const updateProfileImageApi = (file: any) => {

  const formData = new FormData();

  formData.append("profilePic", {
    uri: file.uri,
    type: file.type,
    name: file.fileName || "profile.jpg",
  } as any);

  return fetchClient(API_ROUTES.UPDATE_IMAGE, {
    method: "PUT",
    body: formData,
    isFormData: true,
    requireAuth: true,
  });
};
export const updatePasswordApi = (data: {
  currentPassword: string;
  newPassword: string;
}) => {
  return fetchClient<{ success: boolean }>(API_ROUTES.UPDATE_PASSWORD, {
    method: "PUT",
    requireAuth: true,
    body: JSON.stringify(data),
  });
};

export const getAllUsersApi = () => {
  return fetchClient<User[]>(API_ROUTES.GET_ALL_USERS, {
    method: "GET",
    requireAuth: true,
  });
};

export const followUserApi = (userId: string) => {
  return fetchClient(API_ROUTES.FOLLOW_USER(userId), {
    method: "POST",
    requireAuth: true,
  });
};

export const unfollowUserApi = (userId: string) => {
  return fetchClient(API_ROUTES.UNFOLLOW_USER(userId), {
    method: "DELETE",
    requireAuth: true,
  });
};

export const getUserConnectionsApi = (
  userId: string,
  type: "followers" | "following",
) => {
  return fetchClient<User[]>(API_ROUTES.GET_CONNECTIONS(userId, type), {
    method: "GET",
    requireAuth: true,
  });
};
