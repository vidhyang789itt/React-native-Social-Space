import React from "react";
import { View, Text } from "react-native";
import { styles } from "./style";

interface Props {
  steps: string[];
  currentStep: string;
}

export const StepIndicator = ({
  steps,
  currentStep,
}: Props) => {
  const currentIndex = steps.indexOf(currentStep);

  return (
    <View style={styles.stepContainer}>
      {steps.map((step, index) => {
        const active = index <= currentIndex;

        return (
          <React.Fragment key={step}>
            <View
              style={[
                styles.stepCircle,
                active && styles.stepCircleActive,
              ]}
            >
              <Text
                style={[
                  styles.stepNumber,
                  active && styles.stepNumberActive,
                ]}
              >
                {index + 1}
              </Text>
            </View>

            {index < steps.length - 1 && (
              <View
                style={[
                  styles.stepLine,
                  index < currentIndex &&
                    styles.stepLineActive,
                ]}
              />
            )}
          </React.Fragment>
        );
      })}
    </View>
  );
};