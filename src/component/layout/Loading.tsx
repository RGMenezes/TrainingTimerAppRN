import { useTheme } from "@/hook";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

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
            <Text style={{ color: colors.onBackground, marginTop: 10 }}>Carregando...</Text>
        </View>
    );
}