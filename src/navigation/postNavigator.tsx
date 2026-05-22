import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { RootStackParamList } from '../types/RootStackParamList';
import { HomeScreen } from '../screens/home';
import { PostDetailPage } from '../screens/postDetails';
import PostEditPage from '../screens/editPost';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function PostNavigation() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="PostDetails" component={PostDetailPage} />
      <Stack.Screen name="EditPost" component={PostEditPage} />
    </Stack.Navigator>
  );
}