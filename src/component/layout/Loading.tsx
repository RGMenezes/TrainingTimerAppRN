import { useTheme } from "@/hook";
import { ActivityIndicator, StyleSheet, View } from "react-native";

export default function Loading(){
    const { colors } = useTheme();
    const styles = StyleSheet.create({
        centerContainer: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
        }
    });
    return (
        <View style={styles.centerContainer}>
            <ActivityIndicator size="large" color={colors.primary} />
        </View>
    );
}