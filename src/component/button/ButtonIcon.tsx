import { useTheme } from "@/hook";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { StyleSheet, TouchableOpacity, TouchableOpacityProps } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface ButtonIconProps extends TouchableOpacityProps {
    iconName: React.ComponentProps<typeof MaterialIcons>["name"];
    size?: "small" | "medium" | "large" | "xLarge";
    color?: string;
    elevated?: boolean;
    position?: "left top" | "right top" | "left bottom" | "right bottom";
}

export default function ButtonIcon({ iconName, size = "medium", color = "black", elevated = false, position, ...props }: ButtonIconProps) {
    const theme = useTheme();

    const insets = useSafeAreaInsets();

    const style = StyleSheet.create({
        button: {            
            height: size === "xLarge" ? 50 : 40,
            width: size === "xLarge" ? 50 : 40,
            justifyContent: "center",
            alignItems: "center",
        },
        buttonElevated: {
            backgroundColor: elevated ? theme.colors.primary : "transparent",
            borderRadius: 20,
            elevation: elevated ? 4 : 0, // Sombra para Android
            shadowColor: elevated ? theme.colors.shadow : "transparent", // Sombra para iOS
        },
        buttonPositioned: {
            position: position ? "absolute" : "relative",
            top: position?.includes("top") ? insets.top + 20 : undefined,
            bottom: position?.includes("bottom") ? insets.bottom + 20 : undefined,
            left: position?.includes("left") ? 20 : undefined,
            right: position?.includes("right") ? 20 : undefined,
        }
    });

    return (
        <TouchableOpacity style={[style.button, style.buttonElevated, style.buttonPositioned]} {...props}>
            {<MaterialIcons name={iconName} size={theme.iconSize[size]} color={elevated ? theme.colors.onPrimary : color} />}
        </TouchableOpacity>
    );
}