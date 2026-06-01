

import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { useAppTheme } from "../../theme/ThemeContext";
import { createStyles } from "./style";

interface Props {
  open: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  action: string;
  message: string;
  messageHead: string;
}

export const ConfirmModal = ({
  open,
  onClose,
  onConfirm,
  action,
  message,
  messageHead,
}: Props) => {
  const [loading, setLoading] =
    useState(false);

  const handleConfirm =
    async () => {
      try {
        setLoading(true);
        await onConfirm();
      } finally {
        setLoading(false);
      }
    };
  const { theme } = useAppTheme();
  const styles = createStyles(theme);

  return (
    <Modal
      visible={open}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable
        style={styles.overlay}
        onPress={onClose}
      >
        <Pressable
          style={styles.modal}
          onPress={(e) =>
            e.stopPropagation()
          }
        >
          <Text style={styles.title}>
            {messageHead}
          </Text>

          <Text style={styles.message}>
            {message}
          </Text>

          <View style={styles.buttonGroup}>
            {}
            <TouchableOpacity
              activeOpacity={0.85}
              style={[
                styles.cancelButton,
                loading &&
                  styles.disabledButton,
              ]}
              onPress={onClose}
              disabled={loading}
            >
              <Text
                style={
                  styles.cancelButtonText
                }
              >
                Cancel
              </Text>
            </TouchableOpacity>

            {}
            <TouchableOpacity
              activeOpacity={0.85}
              style={[
                styles.confirmButton,
                loading &&
                  styles.disabledButton,
              ]}
              onPress={
                handleConfirm
              }
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator
                  color="#FFFFFF"
                  size="small"
                />
              ) : (
                <Text
                  style={
                    styles.confirmButtonText
                  }
                >
                  {action}
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
};