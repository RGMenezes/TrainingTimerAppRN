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
    success: "#4CAF50",
    shadow: "rgba(0,0,0,0.2)",
    background: "#F2F2F7",
    onBackground: "#1C1C1E",
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
    success: "#81C784",
    shadow: "rgba(0,0,0,0.7)",
    background: "#121212",
    onBackground: "#FFFFFF",
};

export default function useTheme() {
    const colorScheme = useColorScheme();

    return {
        colorScheme,
        colors: colorScheme === "dark" ? darkColors : lightColors,
        font: {
            main: "System",
        },
        borderRadius: 8,
        iconSize: {
            small: 16,
            medium: 24,
            large: 32,
        }
    };
};