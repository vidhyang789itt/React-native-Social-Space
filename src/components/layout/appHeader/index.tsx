import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  Pressable,
  Switch,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { Bell, Moon, Sun, LogOut } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";

import { createStyles } from "./style";
import { useAppTheme } from "../../../theme/ThemeContext";

import type { AppDispatch, RootState } from "../../../store/store";
import { removeToken } from "../../../utils/AsyncStorage";
import { ConfirmModal } from "../../deletePostModal";

export const AppHeader = () => {
  const navigation = useNavigation<any>();
  const dispatch = useDispatch<AppDispatch>();
  const { unreadCount } = useSelector((state: RootState) => state.notification);

  const { theme, isDark, toggleTheme } = useAppTheme();
  const styles = createStyles(theme);

  const [settingsVisible, setSettingsVisible] = useState(false);
  const [logoutVisible, setLogoutVisible] = useState(false);

  const handleLogout = async () => {
    setLogoutVisible(false);
    setSettingsVisible(false);
    removeToken();
    navigation.navigate("Login");
  };

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.sideBtn}
          activeOpacity={0.7}
          onPress={() => setSettingsVisible(true)}
        >
          <Icon name="menu" size={22} color={theme.colors.text} />
        </TouchableOpacity>

        <View style={styles.centerSection}>
          <Image
            source={require("../../../assests/logo.png")}
            style={styles.logo}
          />
          <Text style={styles.appName}>SocialSpace</Text>
        </View>

        <TouchableOpacity
          style={styles.sideBtn}
          activeOpacity={0.7}
          onPress={() => navigation.navigate("Notifications")}
        >
          <Bell size={24} color={theme.colors.text} />
          {unreadCount > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>
                {unreadCount > 99 ? "99+" : unreadCount}
              </Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      <Modal
        visible={settingsVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setSettingsVisible(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setSettingsVisible(false)}
        >
          <Pressable style={styles.settingsCard}>
            <View style={styles.settingsHeader}>
              <Text style={styles.settingsTitle}>Settings</Text>

              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => setSettingsVisible(false)}
                style={styles.closeBtn}
              >
                <Icon name="x" size={18} color={theme.colors.textMuted} />
              </TouchableOpacity>
            </View>

            <View style={styles.settingRow}>
              <View style={styles.settingLeft}>
                <View style={styles.settingIconWrap}>
                  {isDark ? (
                    <Moon size={18} color={theme.colors.primary} />
                  ) : (
                    <Sun size={18} color={theme.colors.primary} />
                  )}
                </View>

                <View>
                  <Text style={styles.settingLabel}>Dark mode</Text>
                  <Text style={styles.settingDescription}>
                    Switch app appearance
                  </Text>
                </View>
              </View>

              <Switch
                value={isDark}
                onValueChange={toggleTheme}
                trackColor={{
                  false: theme.colors.surfaceSoft,
                  true: theme.colors.primarySoft,
                }}
                thumbColor={isDark ? theme.colors.primary : "#ffffff"}
              />
            </View>

            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.settingRow}
              onPress={() => setLogoutVisible(true)}
            >
              <View style={styles.settingLeft}>
                <View style={styles.settingIconWrap}>
                  <LogOut
                    size={18}
                    color={theme.colors.danger}
                  />
                </View>

                <View>
                  <Text style={styles.settingLabel}>Logout</Text>
                  <Text style={styles.settingDescription}>
                    Sign out from your account
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </Pressable>
        </Pressable>
      </Modal>

      <ConfirmModal
        open={logoutVisible}
        onClose={() => setLogoutVisible(false)}
        onConfirm={handleLogout}
        action="Logout"
        messageHead="Logout"
        message="Are you sure you want to logout from your account?"
      />
    </>
  );
};