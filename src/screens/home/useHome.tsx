import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../../store/store";
import { fetchFeed } from "../../store/slices/postSlice";

export const useHome = (initialPage: number = 1) => {
  const dispatch = useDispatch<AppDispatch>();
  const feed = useSelector((state: RootState) => state.posts.feed);
  const loading = useSelector((state: RootState) => state.posts.loading);
  const error = useSelector((state: RootState) => state.posts.error);
  const pagination = useSelector((state: RootState) => state.posts.pagination);

  const [page, setPage] = useState(initialPage);

  useEffect(() => {
    dispatch(fetchFeed(page));
  }, [dispatch, page]);

  const handleNext = () => {
    if (pagination && page < pagination.totalPages) {
      setPage((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  return {
    posts: feed,
    loading,
    error,
    pagination,
    page,
    handleNext,
    handlePrev,
    setPage,
  };
};
