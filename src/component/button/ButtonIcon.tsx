import { useTheme } from "@/hook";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { StyleSheet, TouchableOpacity, TouchableOpacityProps } from "react-native";

interface ButtonIconProps extends TouchableOpacityProps {
    iconName: React.ComponentProps<typeof MaterialIcons>["name"];
    size?: number;
    color?: string;
}

export default function ButtonIcon({ iconName, size, color = "black", ...props }: ButtonIconProps) {
    const theme = useTheme();
    if (!size) size = theme.iconSize.medium;
    const style = StyleSheet.create({
        button: {
            height: 40,
            width: 40,
            justifyContent: "center",
            alignItems: "center",
        }
    });

    return (
        <TouchableOpacity style={style.button} {...props}>
            {<MaterialIcons name={iconName} size={size} color={color} />}
        </TouchableOpacity>
    );
}