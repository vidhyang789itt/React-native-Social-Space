import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { darkTheme, lightTheme, type AppTheme, type ThemeMode } from "./theme";

type ThemeContextValue = {
  theme: AppTheme;
  mode: ThemeMode;
  isDark: boolean;
  setThemeMode: (mode: ThemeMode) => Promise<void>;
  toggleTheme: () => Promise<void>;
};

const THEME_STORAGE_KEY = "socialspace-theme-mode";

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export const AppThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [mode, setMode] = useState<ThemeMode>("light");

  useEffect(() => {
    const loadTheme = async () => {
      const savedMode = await AsyncStorage.getItem(THEME_STORAGE_KEY);

      if (savedMode === "light" || savedMode === "dark") {
        setMode(savedMode);
      }
    };

    loadTheme();
  }, []);

  const setThemeMode = async (nextMode: ThemeMode) => {
    setMode(nextMode);
    await AsyncStorage.setItem(THEME_STORAGE_KEY, nextMode);
  };

  const toggleTheme = async () => {
    await setThemeMode(mode === "light" ? "dark" : "light");
  };

  const theme = mode === "dark" ? darkTheme : lightTheme;

  const value = useMemo(
    () => ({
      theme,
      mode,
      isDark: mode === "dark",
      setThemeMode,
      toggleTheme,
    }),
    [theme, mode],
  );

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useAppTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useAppTheme must be used inside AppThemeProvider");
  }

  return context;
};
