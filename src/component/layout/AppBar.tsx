import { useTheme } from "@/hook";
import { router } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ButtonIcon from "../button/ButtonIcon";

export default function AppBar({title = "Training Timer", back}: {title?: string, back?: boolean}) {
    const insets = useSafeAreaInsets();
    const theme = useTheme();

    const styles = StyleSheet.create({
        container: {
            padding: 13,
            paddingTop: insets.top + 13,
            paddingBlock: 8,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",

            backgroundColor: theme.colors.primary,
        },
        actionsBox: {
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
        },
        title: {
            fontSize: 20,
            color: theme.colors.onPrimary,
            fontFamily: theme.font.main,
            textTransform: "capitalize",
        }
    });

    return (
        <View style={styles.container}>
            <View style={styles.actionsBox}>
                {back &&
                    <ButtonIcon 
                        iconName="arrow-back" color={theme.colors.onPrimary}
                        onPress={() => router.back()}
                    />
                }
                <Text style={styles.title}>{title}</Text>
            </View>
            <View style={styles.actionsBox}>
                <ButtonIcon 
                    iconName="assignment-turned-in" color={theme.colors.onPrimary} 
                    onPress={() => router.navigate("/group")}
                />
                <ButtonIcon 
                    iconName="fitness-center" color={theme.colors.onPrimary} 
                    onPress={() => router.navigate("/workout")}
                />
            </View>
        </View>
    );
}