import { useTheme } from "@/hook";
import { StyleSheet, Text, TextProps } from "react-native";

interface SmallProps extends TextProps {
    color?: string;
    children?: React.ReactNode;
}

export default function Small({ children , color, ...textProps}: SmallProps) {
    const theme = useTheme();
    if(!color) color = theme.colors.onBackground;
    const styles = StyleSheet.create({
        text: {
            fontSize: 14,
            fontWeight: "normal",
            color: color,
            fontFamily: theme.font.main,
        }
    });

    return (
        <Text style={styles.text} {...textProps}>{children}</Text>
    );
}