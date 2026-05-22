import React, { useState } from 'react';
import ProfilePage from '../../components/profile/profilePage';

const UserProfileScreen = ({ route }: any) => {
  const userId = route?.params?.userId;
  return <ProfilePage key={`user-${userId}`} userId={userId} />;
};

export default UserProfileScreen;
