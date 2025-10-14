import { useTheme } from "@/hook";
import { Dimensions, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import P from "../text/P";
import Button from "../button/Button";

interface BoxMessageProps {
    message: string;
    type?: "default" | "error" | "success" | "info";
    onClose: () => void;
    onConfirm?: () => void;
}

export default function BoxMessage({ message, type = "default", onClose, onConfirm }: BoxMessageProps) {
    const insets = useSafeAreaInsets();
    const screenHeight = Dimensions.get("window").height;
    const screenWidth = Dimensions.get("window").width;
    const theme = useTheme();
    
    const colorBox = {
        surfaceIn: theme.colors.surface,
        onSurfaceIn: theme.colors.onSurface,
    };
    if(type === "error"){
        colorBox.surfaceIn = theme.colors.error;
        colorBox.onSurfaceIn = theme.colors.onError;
    } else if(type === "success"){
        colorBox.surfaceIn = theme.colors.success;
        colorBox.onSurfaceIn = theme.colors.onSuccess;
    } else if(type === "info"){
        colorBox.surfaceIn = theme.colors.tertiary;
        colorBox.onSurfaceIn = theme.colors.onTertiary;
    }

    const styles = StyleSheet.create({
        container:{
            position: "absolute",
            zIndex: 1,
            height: screenHeight + insets.top + insets.bottom,
            width: screenWidth + insets.left + insets.right,
            padding: 20,

            alignItems: "center",
            justifyContent: "center",
        },
        box: {
            width: 300,
            padding: 20,

            alignItems: "center",
            justifyContent: "space-between",
            gap: 30, 
            
            backgroundColor: colorBox.surfaceIn,
            borderRadius: theme.borderRadius,
            borderWidth: 1,
            borderColor: theme.colors.shadow,
        },
        buttonContainer: {
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-around",
            gap: 5,
        },
        text: {
            fontWeight: "semibold",
            textAlign: "center",
            color: colorBox.onSurfaceIn,
        },
    });

    return (
        <View onTouchEnd={onClose} style={styles.container}>
            <View onTouchEnd={(e) => e.stopPropagation()} style={styles.box}>
                <P style={styles.text}>{message}</P>
                {onConfirm && 
                    <View style={styles.buttonContainer}>
                        <Button type="error" title="Cancelar" onPress={onClose}/>
                        <Button type="success" title="Confirmar" onPress={() => {
                            onConfirm();
                            onClose();
                        }}/>
                    </View>
                }
            </View>
        </View>
    );
}