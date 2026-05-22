import { StyleSheet } from "react-native";
import { useAppTheme } from "../../theme/ThemeContext";

export const createStyles = () => {
    const { theme } = useAppTheme();

    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.colors.surface,
            padding: 16,
        },

        header: {
            fontSize: 20,
            fontWeight: "800",
            color: theme.colors.text,
            marginBottom: 12,
        },

        button: {
            backgroundColor: theme.colors.primary,
            paddingVertical: 10,
            paddingHorizontal: 20,
            borderRadius: 8,
            alignItems: "center",
            justifyContent: "center",
            marginTop: 16,
        },

        buttonText: {
            color: "#fff",
            fontSize: 16,
            fontWeight: "600",
        },

        notFoundContainer: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: theme.colors.surface,
            padding: 20,
        },

        notFoundText: {
            fontSize: 18,
            fontWeight: "600",
            color: theme.colors.text,
            marginBottom: 16,
        },
    });
};