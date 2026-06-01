

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRoute, useNavigation } from '@react-navigation/native';
import type { AppDispatch, RootState } from '../../store/store';
import { fetchSinglePost, deletePost } from '../../store/slices/postSlice';
import { fetchProfile } from '../../store/slices/authSlice';
import { getToken } from '../../utils/AsyncStorage';
import { BASE_URL } from '../../constants/ApiRoutes';

export const usePostDetail = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const postId = route.params?.postId;
  const { singlePost: post, loading } = useSelector(
    (state: RootState) => state.posts,
  );
  const { user: currentUser } = useSelector((state: RootState) => state.auth);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    if (postId) {
      dispatch(fetchSinglePost(postId));
    }
  }, [dispatch, postId]);

  useEffect(() => {
    const loadProfile = async () => {
      const token = await getToken();

      if (token && !currentUser) {
        dispatch(fetchProfile());
      }
    };

    loadProfile();
  }, [dispatch, currentUser]);

  const handleDelete = async () => {
    if (post?.postId) {
      await dispatch(deletePost(post.postId)).unwrap();
      navigation.goBack();
    }
  };

  const refreshPost = () => {
    if (post?.postId) {
      dispatch(fetchSinglePost(post.postId));
    }
  };

  const isOwner = !!currentUser && post?.author?._id === currentUser._id;

  return {
    post,
    loading,
    isOwner,
    showEditModal,
    setShowEditModal,
    handleDelete,
    refreshPost,
    navigation,
    BASE_URL,
  };
};
