import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { RootStackParamList } from '../types/RootStackParamList';
import { PostDetailPage } from '../screens/postDetails';
import ProfilePage from '../components/profile/profilePage';
import ProfileScreen from '../screens/profile';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function ProfileNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="PostDetails" component={PostDetailPage} />
    </Stack.Navigator>
  );
}