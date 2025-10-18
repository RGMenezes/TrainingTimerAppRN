import { useTheme } from "@/hook";
import { StyleSheet, Text, TextProps } from "react-native";

interface H1Props extends TextProps {
    color?: string;
    children?: React.ReactNode;
}

export default function H1({ children , color, style, ...textProps}: H1Props) {
    color = useTheme().colors.onBackground;
    const styles = StyleSheet.create({
        text: {
            fontSize: 26,
            fontWeight: "bold",
            color: color,
            fontFamily: useTheme().font.main,
        }
    });

    return (
        <Text {...textProps} style={[styles.text, style]}>{children}</Text>
    );
}