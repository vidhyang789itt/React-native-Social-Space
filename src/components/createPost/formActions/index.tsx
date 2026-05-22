

import React from "react";

import {
  View,
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from "react-native";

import { createStyles } from "./style";
import { useAppTheme } from "../../../theme/ThemeContext";


interface Props {
  loading?: boolean;
  isEdit?: boolean;

  onClose: () => void;

  onSubmit: () => void;
}

export const FormActions = ({
  loading,
  isEdit,
  onClose,
  onSubmit,
}: Props) => {
  const { theme } = useAppTheme();
const styles = createStyles(theme);

  return (
    <View style={styles.container}>

      <TouchableOpacity
        style={styles.cancelBtn}
        onPress={onClose}
      >
        <Text style={styles.cancelText}>
          Cancel
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.submitBtn}
        onPress={onSubmit}
        disabled={loading}
      >
        {loading ? (

          <ActivityIndicator
            color="#FFFFFF"
          />

        ) : (

          <Text style={styles.submitText}>
            {isEdit
              ? "Update"
              : "Create"}
          </Text>

        )}
      </TouchableOpacity>

    </View>
  );
};