import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../../../store/store";
import {
  fetchUserById,
  editProfile,
  updatePassword,
  clearViewedUser,
} from "../../../store/slices/userSlice";

import {
  fetchMyProfilePosts,
  fetchViewedUserPosts,
  clearMyProfilePosts,
  clearViewedUserPosts,
} from "../../../store/slices/postSlice";


export const useProfile = (id?: string) => {
  const dispatch = useDispatch<AppDispatch>();

  const { user: currentUser } = useSelector((state: RootState) => state.auth);
  const { viewedUser, loading: userLoading } = useSelector(
    (state: RootState) => state.users,
  );
  const {
    myProfilePosts,
    viewedUserPosts,
    loading: postsLoading,
  } = useSelector((state: RootState) => state.posts);
  const profileUserId = id || currentUser?.userId;
  const isOwnProfile = !id || id === currentUser?.userId;
  const posts = isOwnProfile ? myProfilePosts : viewedUserPosts;


  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({ username: "", email: "" });
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
  });

  const refreshPosts = () => {
    if (!profileUserId) return;

    if (isOwnProfile) {
      dispatch(fetchMyProfilePosts(profileUserId));
    } else {
      dispatch(fetchViewedUserPosts(profileUserId));
    }
  };

  useEffect(() => {
    if (!profileUserId) return;

    dispatch(fetchUserById(profileUserId));

    if (isOwnProfile) {
      dispatch(clearMyProfilePosts());
      dispatch(fetchMyProfilePosts(profileUserId));
    } else {
      dispatch(clearViewedUserPosts());
      dispatch(fetchViewedUserPosts(profileUserId));
    }
  }, [dispatch, profileUserId, isOwnProfile]);



  useEffect(() => {
    if (viewedUser) {
      setFormData({ username: viewedUser.username, email: viewedUser.email });
    }
  }, [viewedUser]);

  const handleSaveProfile = async () => {
    if (!formData.username.trim() || !formData.email.trim())
      return setError("Fields cannot be empty.");
    setError("");
    console.log(formData);
    
    await dispatch(editProfile(formData));
    setIsEditing(false);
  };

  const handlePasswordUpdate = async () => {
    if (!passwordData.currentPassword || !passwordData.newPassword)
      return setError("Fill all fields.");
    const resultAction = await dispatch(updatePassword(passwordData));
    if (updatePassword.fulfilled.match(resultAction)) {
      setIsChangingPassword(false);
      setPasswordData({ currentPassword: "", newPassword: "" });
    } else if (typeof resultAction.payload === "string") {
      setError(resultAction.payload);
    }
  };

  return {
    viewedUser,
    currentUser,
    posts,
    loading: userLoading || postsLoading,
    isEditing,
    setIsEditing,
    isChangingPassword,
    setIsChangingPassword,
    formData,
    setFormData,
    passwordData,
    setPasswordData,
    error,
    setError,
    handleSaveProfile,
    handlePasswordUpdate,
    refreshPosts,
  };
};
