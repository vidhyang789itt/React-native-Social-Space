import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  SafeAreaView,
  RefreshControl,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../../store/store';
import { PostGridItem } from '../../../components/profile/PostGridItem';
import { updateProfileImage } from '../../../store/slices/userSlice';
import { launchImageLibrary } from 'react-native-image-picker';
import { useProfile } from './useProfile';
import { EditProfileModal } from '../../../components/profile/editProfileModal';
import { BASE_URL } from '../../../constants/ApiRoutes';
import { updateCurrentUser } from '../../../store/slices/authSlice';
import { FollowAction } from '../followAction';
import { useNavigation } from '@react-navigation/native';
import { useAppTheme } from '../../../theme/ThemeContext';
import { createStyles } from './style';

const COLUMN_COUNT = 3;

interface ProfilePageProps {
  userId?: string;
}

const ProfilePage = ({
  userId,
}: ProfilePageProps) => {
  const navigation = useNavigation<any>();
  const dispatch = useDispatch<AppDispatch>();
  const { theme } = useAppTheme(); 
  const styles = createStyles(theme);
  const profile = useProfile(userId);
  const { user: currentUser } = useSelector((state: RootState) => state.auth);

  const isOwnProfile =
  !userId ||
  currentUser?.userId === userId;

  const user = isOwnProfile
  ? currentUser
  : profile.viewedUser;

  const onRefresh = async () => {
    profile.refreshPosts();
  };

  const handleChoosePhoto = () => {
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response.assets && response.assets[0]) {
        const file = response.assets[0];
        dispatch(updateProfileImage(file as any))
        .unwrap()
        .then((data) => {

          dispatch(updateCurrentUser({
            profileUrl: data.profileUrl,
          }));

        });
      }
    });
  };

  const Header = () => {
    const isFollowing = user?.followers?.includes(currentUser?._id);

    return (
      <View style={styles.headerContainer}>
        <View style={styles.coverSection}>
          <Image 
            source={require('../../../assests/profileBackground.png')} 
            style={styles.coverImage} 
          />
        </View>

        <View style={styles.mainContent}>
          <View style={styles.avatarWrapper}>
            <Image
              source={
                user?.profileUrl 
                  ? { uri: `${BASE_URL}/${user.profileUrl}` }
                  : require('../../../assests/temp_profile.png')
              }
              style={styles.avatar}
            />
            {isOwnProfile && (
              <TouchableOpacity style={styles.changePhotoBtn} onPress={handleChoosePhoto}>
                <Text style={styles.changePhotoText}>Change Photo</Text>
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.infoSection}>
            <View style={styles.headerRow}>
              <Text style={styles.username}>{user?.username || 'Loading...'}</Text>
              
              <View style={styles.buttonRow}>
                {isOwnProfile ? (
                  <TouchableOpacity style={styles.editBtn} onPress={() => profile.setIsEditing(true)}>
                    <Text style={styles.editBtnText}>Edit Profile</Text>
                  </TouchableOpacity>
                ) : (
                  <>
                    <FollowAction targetUser={user} />

                    {isFollowing && (
                      <TouchableOpacity
                        style={styles.messageBtn}
                        onPress={() =>
                          navigation.navigate("Chat", {
                            otherUserId: user?.userId,
                            chatType: "direct",
                          })
                        }
                      >
                        <Icon
                          name="message-circle"
                          size={18}
                          color="#1f2937"
                        />

                        <Text style={styles.messageBtnText}>
                          Message
                        </Text>
                      </TouchableOpacity>
                    )}
                  </>
                )}
              </View>
            </View>

            <View style={styles.statsRow}>
              <StatItem count={profile.posts?.length || 0} label="Posts" styles={styles} />
              <StatItem count={user?.followers?.length || 0} label="Followers" styles={styles} />
              <StatItem count={user?.following?.length || 0} label="Following" styles={styles} />
            </View>
          </View>
        </View>

        <View style={styles.tabDivider}>
          <Text style={styles.tabItemActive}>Posts</Text>
        </View>
      </View>
    );
  };

  if (profile.loading && !profile.viewedUser) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#6366f1" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={profile.posts || []}
        keyExtractor={(item) => item._id?.toString() || Math.random().toString()}
        renderItem={({ item }) => <PostGridItem item={item} />}
        numColumns={COLUMN_COUNT}
        ListHeaderComponent={Header}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl 
            refreshing={profile.loading} 
            onRefresh={onRefresh} 
            tintColor="#6366f1" 
          />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No posts yet</Text>
          </View>
        }
      />

      <EditProfileModal
        visible={profile.isEditing}
        onClose={() => profile.setIsEditing(false)}
        formData={profile.formData}
        setFormData={profile.setFormData}
        onSave={profile.handleSaveProfile}
        error={profile.error}
      />
    </SafeAreaView>
  );
};

const StatItem = ({
  count,
  label,
  styles,
}: {
  count: number;
  label: string;
  styles: ReturnType<typeof createStyles>;
}) => (
  <View style={styles.statBox}>
    <Text style={styles.statCount}>{count}</Text>
    <Text style={styles.statLabel}>{label}</Text>
  </View>
);

export default ProfilePage;
