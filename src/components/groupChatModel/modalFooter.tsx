import React from "react";
import {
  View,
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from "react-native";
import { styles } from "./style";

interface Props {
  currentStep: string;
  isLoading: boolean;
  canGoNext: boolean;
  onBack: () => void;
  onNext: () => void;
}

export const ModalFooter = ({
  currentStep,
  isLoading,
  canGoNext,
  onBack,
  onNext,
}: Props) => {
  return (
    <View style={styles.footer}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={onBack}
        disabled={isLoading}
      >
        <Text style={styles.backButtonText}>
          Back
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.nextButton,
          !canGoNext &&
            styles.disabledButton,
        ]}
        onPress={onNext}
        disabled={!canGoNext || isLoading}
      >
        {isLoading ? (
          <ActivityIndicator
            color="#FFFFFF"
          />
        ) : (
          <Text style={styles.nextButtonText}>
            {currentStep === "review"
              ? "Create Group"
              : "Next"}
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
};