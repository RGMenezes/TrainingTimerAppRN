import { StyleSheet, View } from "react-native";
import Button from "../button/Button";
import P from "../text/P";

export default function ViewError({ message, onPress }: { message?: string, onPress?: () => void }){
    const styles = StyleSheet.create({
        centerContainer: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            gap: 20,
        },
    });

    return(
        <View style={styles.centerContainer}>
            <P>{message}</P>
            <Button title="Tentar Novamente" onPress={onPress} />
        </View>
    );
}