import { AppBar, H1 } from "@/component";
import { useTheme } from "@/hook";
import { StyleSheet, View } from "react-native";

export default function GroupScreen() {
    const styles = StyleSheet.create({
        container: {
            flex: 1,
                
            backgroundColor: useTheme().colors.background,
            color: useTheme().colors.onBackground,
        }
    });
    
    return (
        <View style={styles.container}>
            <AppBar back title="Grupos"/>
            <H1>Grupos</H1>
        </View>
    );
}