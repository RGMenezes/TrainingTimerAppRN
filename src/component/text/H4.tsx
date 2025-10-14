import { useTheme } from "@/hook";
import { StyleSheet, Text, TextProps } from "react-native";

interface H4Props extends TextProps {
    color?: string;
    children?: React.ReactNode;
}

export default function H4({ children , color, ...textProps}: H4Props) {
    color = useTheme().colors.onBackground;
    const styles = StyleSheet.create({
        text: {
            fontSize: 16,
            fontWeight: "bold",
            color: color,
            fontFamily: useTheme().font.main,
            
        }
    });

    return (
        <Text {...textProps} style={styles.text}>{children}</Text>
    );
}