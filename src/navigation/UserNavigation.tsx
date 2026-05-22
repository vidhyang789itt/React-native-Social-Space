import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import {UsersScreen} from '../screens/users'; 
import { RootStackParamList } from '../types/RootStackParamList';
import UserProfileScreen from '../screens/userProfile';
const Stack = createNativeStackNavigator<RootStackParamList>();

export default function UserNavigation() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Users" component={UsersScreen} />
    </Stack.Navigator>
  );
}