import { useTheme } from "@/hook";
import { StyleSheet, View, ViewProps } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface ViewMainProps extends ViewProps {
    children?: React.ReactNode;
    backgroundColor?: string;
}

export default function ViewMain({ children, style, backgroundColor, ...rest }: ViewMainProps) {
    const theme = useTheme();
    const insets = useSafeAreaInsets();
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            paddingBottom: insets.bottom,

            backgroundColor: backgroundColor ? backgroundColor : theme.colors.background,
            color: theme.colors.onBackground,
        }
    });
        
    return (
        <View style={[styles.container, style]} {...rest}>
            {children}
        </View>
    );
}