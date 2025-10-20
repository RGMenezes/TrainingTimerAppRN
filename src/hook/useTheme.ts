import { useColorScheme } from "react-native";

export const lightColors = {
    primary: "#23B4A1",
    onPrimary: "#FFFFFF",
    secondary: "#FFB74D",   // contraste quente
    onSecondary: "#000000",
    tertiary: "#8E24AA",    // um roxo suave
    onTertiary: "#FFFFFF",
    surface: "#FFFFFF",      // cards, elementos
    onSurface: "#1C1C1E",    // texto sobre surface
    error: "#B00020",
    onError: "#FFFFFF",
    success: "#4CAF50",
    onSuccess: "#FFFFFF",
    shadow: "rgba(0,0,0,0.2)",
    contrast: "rgba(0, 0, 0, 0.6)",
    background: "#F2F2F7",
    onBackground: "#1C1C1E",
    playerStart: "#4A90E2",   
    playerExercise: "#66BB6A",
    playerRestSeries: "#FFB74D",
    playerRestBlock: "#ADD8E6",
    playerEnd: "#FF9800",
};

export const darkColors = {
    primary: "#23B4A1",
    onPrimary: "#ffffff",
    secondary: "#FFB74D",
    onSecondary: "#000000",
    tertiary: "#CE93D8",
    onTertiary: "#000000",
    surface: "#1C1C1E",
    onSurface: "#FFFFFF",
    error: "#CF6679",
    onError: "#000000",
    success: "#81C784",
    onSuccess: "#000000",
    shadow: "rgba(0,0,0,0.7)",
    contrast: "rgba(255, 255, 255, 0.6)",
    background: "#121212",
    onBackground: "#FFFFFF",
    playerStart: "#3E7DCF",   
    playerExercise: "#4CAF50",
    playerRestSeries: "#FF9800",
    playerRestBlock: "#5D8AA8",
    playerEnd: "#FF5722",
};

export default function useTheme() {
    const colorScheme = useColorScheme();

    return {
        colorScheme,
        colors: colorScheme === "dark" ? darkColors : lightColors,
        // colors: lightColors,
        font: {
            main: "System",
        },
        borderRadius: 8,
        iconSize: {
            small: 16,
            medium: 24,
            large: 32,
            xLarge: 40,
        }
    };
};