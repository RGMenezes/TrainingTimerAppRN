import { useTheme } from "@/hook";
import { StyleSheet, Text, TextProps } from "react-native";

interface PProps extends TextProps {
    color?: string;
    children?: React.ReactNode;
}

export default function P({ children , color, style, ...textProps}: PProps) {
    const theme = useTheme();
    if(!color) color = theme.colors.onBackground;
    const styles = StyleSheet.create({
        text: {
            fontSize: 16,
            fontWeight: "normal",
            color: color,
            fontFamily: theme.font.main,
        }
    });

    return (
        <Text style={[styles.text, style]} {...textProps}>{children}</Text>
    );
}