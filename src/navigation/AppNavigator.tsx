import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '../screens/auth/Login';
import RegisterScreen from '../screens/auth/register';
import MainTabs from './MainTabs';
import ChatScreen from '../screens/chat';
import NotificationScreen from '../screens/notification';
import { RootStackParamList } from '../types/RootStackParamList';
import { CreatePostScreen } from '../screens/createPost';
import UserProfileScreen from '../screens/userProfile';
import PostEditPage from '../screens/editPost';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Main" component={MainTabs} />
      <Stack.Screen name="Chat" component={ChatScreen} />
      <Stack.Screen name="Notifications" component={NotificationScreen} />
      <Stack.Screen name="CreatePost" component={CreatePostScreen} />
      <Stack.Screen name="UserProfile" component={UserProfileScreen} />
    </Stack.Navigator>
  );
}
