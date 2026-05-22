import React from 'react';
import { View, StyleSheet } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Icon from 'react-native-vector-icons/Feather';

import { CreatePostScreen } from '../screens/createPost';
import UserNavigation from './UserNavigation';
import { AppHeader } from '../components/layout/appHeader';
import PostNavigation from './postNavigator';
import ProfileNavigator from './ProfileNavigator';
import ConversationsScreen from '../screens/conversations';

const Tab = createMaterialTopTabNavigator();

const getTabIcon = (routeName: string) => {
  switch (routeName) {
    case 'Home':
      return 'home';
    case 'Chats':
      return 'message-circle';
    case 'CreatePost':
      return 'plus';
    case 'Users':
      return 'users';
    case 'Profile':
      return 'user';
    default:
      return 'circle';
  }
};

export default function MainTabs() {
  const { theme } = useAppTheme(); 
  const styles = createStyles(theme);
  return (
    <>
      <AppHeader />

      <Tab.Navigator
        tabBarPosition="bottom"
        screenOptions={({ route }) => ({
          swipeEnabled: false,
          tabBarActiveTintColor: '#5b5ce2',
          tabBarInactiveTintColor: '#94a3b8',
          tabBarIndicatorStyle: { height: 0 },
          tabBarShowIcon: true,
          tabBarLabelStyle: {
            fontSize: 10.5,
            fontWeight: '700',
            textTransform: 'none',
            marginTop: 0,
          },
          tabBarStyle: styles.tabBar,
          tabBarItemStyle: styles.tabBarItem,
          tabBarIcon: ({ color, focused }) => {
            const iconName = getTabIcon(route.name);

            if (route.name === 'CreatePostButton') {
              return (
                <View style={styles.createButton}>
                  <Icon name="plus" size={25} color="#ffffff" />
                </View>
              );
            }

            return (
              <View
                style={[
                  styles.iconWrap,
                  focused && styles.iconWrapActive,
                ]}
              >
                <Icon
                  name={iconName}
                  size={21}
                  color={focused ? '#5b5ce2' : color}
                />
              </View>
            );
          },
        })}
      >
        <Tab.Screen name="Home" component={PostNavigation} />
        <Tab.Screen name="Chats" component={ConversationsScreen} />
        <Tab.Screen
          name="CreatePostButton"
          component={PostNavigation}
          listeners={({ navigation }) => ({
            tabPress: (e) => {
              e.preventDefault();
              navigation.getParent()?.navigate("CreatePost");
            },
          })}
          options={{
            tabBarLabel: "",
          }}
        />
        <Tab.Screen name="Users" component={UserNavigation} />
        <Tab.Screen name="Profile" component={ProfileNavigator} />
      </Tab.Navigator>
    </>
  );
}
import type { AppTheme } from "../theme/theme";
import { useAppTheme } from '../theme/ThemeContext';

const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    tabBar: {
      backgroundColor: theme.colors.surface,
      borderTopWidth: 1,
      borderTopColor: theme.colors.border,

      elevation: 10,
      shadowColor: theme.colors.shadow,
      shadowOffset: {
        width: 0,
        height: -3,
      },
      shadowOpacity: theme.mode === "dark" ? 0.2 : 0.07,
      shadowRadius: 10,

      height: 70,
      paddingTop: 5,
      paddingBottom: 5,
    },

    tabBarItem: {
      justifyContent: "center",
      alignItems: "center",
    },

    iconWrap: {
      width: 34,
      height: 28,
      borderRadius: 14,
      alignItems: "center",
      justifyContent: "center",
    },

    iconWrapActive: {
      backgroundColor: theme.colors.primarySoft,
    },

    createButton: {
      width: 42,
      height: 42,
      borderRadius: 21,
      backgroundColor: theme.colors.primary,
      alignItems: "center",
      justifyContent: "center",

      shadowColor: theme.colors.primary,
      shadowOffset: {
        width: 0,
        height: 5,
      },
      shadowOpacity: 0.25,
      shadowRadius: 8,
      elevation: 8,
    },
  });