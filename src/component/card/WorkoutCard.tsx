import { useTheme } from "@/hook";
import { Workout } from "@/model";
import { StyleSheet, View } from "react-native";
import Button from "../button/Button";
import H4 from "../text/H4";
import Small from "../text/Small";

export default function WorkoutCard({ workout , isPendingDel, onDelete}: {workout: Workout, isPendingDel?: boolean, onDelete: () => void}){
    const theme = useTheme();

    const styles = StyleSheet.create({
        card: {
            padding: 15,
            marginBottom: 10,
            
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            
            backgroundColor: theme.colors.surface,
            borderColor: theme.colors.shadow,
            borderRadius: theme.borderRadius,
            elevation: 1, // Sombra para Android
            shadowColor: "#000", // Sombra para iOS
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.2,
            shadowRadius: 1.41,
        }
    });

    return (
        <View style={styles.card}>
            <View>
                <H4>{workout.name}</H4>
                <Small>Blocos: {workout.blocks.length}</Small>
            </View>
            <Button 
                title={isPendingDel ? "Excluindo..." : "Excluir"}
                type="error"
                onPress={onDelete} 
                disabled={isPendingDel}
            />
        </View>
    );
}