import { useTheme } from "@/hook";
import { StyleSheet, View, ViewProps } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface ViewMainProps extends ViewProps {
    children?: React.ReactNode;
}

export default function ViewMain({ children, style, ...rest }: ViewMainProps) {
    const theme = useTheme();
    const insets = useSafeAreaInsets();
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            paddingBottom: insets.bottom,

            backgroundColor: theme.colors.background,
            color: theme.colors.onBackground,
        }
    });
        
    return (
        <View style={[styles.container, style]} {...rest}>
            {children}
        </View>
    );
}