export type ThemeMode = "light" | "dark";

export type AppTheme = {
  mode: ThemeMode;

  colors: {
    background: string;
    surface: string;
    surfaceSoft: string;
    card: string;
    text: string;
    textMuted: string;
    textSoft: string;
    border: string;
    primary: string;
    primarySoft: string;
    primaryText: string;
    danger: string;
    success: string;
    inputBackground: string;
    shadow: string;
  };
};

export const lightTheme: AppTheme = {
  mode: "light",
  colors: {
    background: "#f8fafc",
    surface: "#ffffff",
    surfaceSoft: "#f1f5f9",
    card: "#ffffff",
    text: "#111827",
    textMuted: "#64748b",
    textSoft: "#94a3b8",
    border: "#eef2f7",
    primary: "#5b5ce2",
    primarySoft: "#eef2ff",
    primaryText: "#ffffff",
    danger: "#ef4444",
    success: "#22c55e",
    inputBackground: "#f8fafc",
    shadow: "#0f172a",
  },
};

export const darkTheme: AppTheme = {
  mode: "dark",
  colors: {
    background: "#000000",      
    surface: "#111111",        
    surfaceSoft: "#1A1A1A",    
    card: "#111111",
    text: "#FFFFFF",            
    textMuted: "#B0B3B8",       
    textSoft: "#6B7280",     
    border: "#2A2A2A",         
    primary: "#8B5CF6",        
    primarySoft: "#2E1065",     
    primaryText: "#FFFFFF",     
    danger: "#F87171",         
    success: "#34D399",     
    inputBackground: "#1A1A1A",
    shadow: "#000000",
  },
};