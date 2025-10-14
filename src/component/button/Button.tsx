import { useTheme } from "@/hook";
import { StyleSheet, TouchableOpacity, TouchableOpacityProps } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import P from "../text/P";

interface ButtonProps extends TouchableOpacityProps {
    title?: string
    type?: "default" | "success" | "error" | "detach"
    position?: "left top" | "right top" | "left bottom" | "right bottom";
}

export default function Button({ title, type, position, ...props }: ButtonProps) {
    const theme = useTheme();
    
    const colorButton = {
        surfaceIn: theme.colors.primary,
        onSurfaceIn: theme.colors.onPrimary
    };
    if(type === "detach"){
        colorButton.surfaceIn = theme.colors.secondary;
        colorButton.onSurfaceIn = theme.colors.onSecondary;
    }else if(type === "success"){
        colorButton.surfaceIn = theme.colors.success;
        colorButton.onSurfaceIn = theme.colors.onSuccess;
    }else if(type === "error"){
        colorButton.surfaceIn = theme.colors.error;
        colorButton.onSurfaceIn = theme.colors.onError;
    }

    const insets = useSafeAreaInsets();
    const style = StyleSheet.create({
        button: {            
            paddingLeft: 13,
            paddingRight: 13,
            paddingTop: 10,
            paddingBottom: 10,
            justifyContent: "center",
            alignItems: "center",

            backgroundColor: colorButton.surfaceIn,
            borderRadius: theme.borderRadius,
            elevation: 4, // Sombra para Android
            shadowColor: theme.colors.shadow, // Sombra para iOS
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
        <TouchableOpacity style={[style.button, style.buttonPositioned]} {...props}>
            <P color={colorButton.onSurfaceIn}>{title}</P>
        </TouchableOpacity>
    );
}