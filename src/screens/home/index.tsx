import React, { useMemo, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import Icon from 'react-native-vector-icons/Feather';

import { PostCard } from '../../components/post/postCard';

import { useHome } from './useHome';

import type { Post } from '../../types/post.types';

import { createStyles } from './style';

import Loader from '../../components/common/index';
import { useAppTheme } from '../../theme/ThemeContext';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { fetchFeed } from '../../store/slices/postSlice';

export const HomeScreen = () => {
  const { theme } = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const {
    posts,
    loading,
    error,
    pagination,
    page,
    handleNext,
    handlePrev,
    setPage
  } = useHome(1);

  const totalPages = pagination?.totalPages || 1;

  const renderPageNumbers = useCallback(() => {
    const pages = [];

    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= page - 1 && i <= page + 1)) {
        pages.push(
          <TouchableOpacity
            key={i}
            activeOpacity={0.8}
            style={[styles.pageButton, page === i && styles.activePageButton]}
            onPress={() => setPage(i)}
          >
            <Text
              style={[styles.pageText, page === i && styles.activePageText]}
            >
              {i}
            </Text>
          </TouchableOpacity>,
        );
      } else if (i === page - 2 || i === page + 2) {
        pages.push(
          <Text key={i} style={styles.dots}>
            ...
          </Text>,
        );
      }
    }

    return pages;
  }, [totalPages, page, styles, setPage]);

  const renderItem = useCallback(
    ({ item }: { item: Post }) => <PostCard post={item} />,
    [],
  );

  const keyExtractor = useCallback((item: Post) => item.postId, []);

  if (loading && page === 1) {
    return <Loader />;
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  const hasNoPosts = posts.length === 0;
  const dispatch = useDispatch<AppDispatch>();
  return (
    <View style={styles.container}>
      {hasNoPosts ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No posts found ✨</Text>
        </View>
      ) : (
        <FlatList
          data={posts}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          maxToRenderPerBatch={8}
          refreshing={loading}
          windowSize={5}
          onRefresh={() => dispatch(fetchFeed(1))}
          initialNumToRender={5}
          removeClippedSubviews={true}
          ListFooterComponent={
            <>
              {pagination && (
                <View style={styles.paginationWrapper}>
                  {}
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={handlePrev}
                    disabled={page === 1 || loading}
                    style={[
                      styles.navButton,
                      (page === 1 || loading) && styles.disabledButton,
                    ]}
                  >
                    <Icon name="chevron-left" size={18} color="#7C3AED" />
                    <Text style={styles.navText}>Previous</Text>
                  </TouchableOpacity>

                  {}
                  <View style={styles.pageNumbers}>{renderPageNumbers()}</View>

                  {}
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={handleNext}
                    disabled={page === pagination.totalPages || loading}
                    style={[
                      styles.navButton,
                      (page === pagination.totalPages || loading) &&
                        styles.disabledButton,
                    ]}
                  >
                    <Text style={styles.navText}>Next</Text>
                    <Icon name="chevron-right" size={18} color="#7C3AED" />
                  </TouchableOpacity>
                </View>
              )}

              {}
              <Text style={styles.resultsText}>
                Total {pagination?.totalPost || 0} posts
              </Text>
            </>
          }
        />
      )}
    </View>
  );
};
