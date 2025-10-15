import { useTheme } from "@/hook";
import { Workout } from "@/model";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import ButtonIcon from "../button/ButtonIcon";
import H4 from "../text/H4";
import Small from "../text/Small";

interface WorkoutCardProps {
    workout: Workout;
    action?: boolean;
    isPendingDel?: boolean;
    onDelete?: () => void;
    onEdit?: () => void;
    onPress?: () => void;
}

export default function WorkoutCard({ workout , isPendingDel, action = true, onDelete, onEdit, onPress}: WorkoutCardProps){
    const theme = useTheme();
    const styles = StyleSheet.create({
        card: {
            padding: 15,
            marginBottom: 10,
            
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            
            backgroundColor: isPendingDel ? theme.colors.error : theme.colors.surface,
            borderColor: theme.colors.shadow,
            borderRadius: theme.borderRadius,
            elevation: 1, // Sombra para Android
            shadowColor: "#000", // Sombra para iOS
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.2,
            shadowRadius: 1.41,
        },
        rowContainer: {
            flexDirection: "row",
            gap: 20
        }
    });

    let blocks = workout.blocks.length;
    let series = 0;
    let time = 0;
    workout.blocks.map((block) => {
        series += block.series.length;
        block.series.map((serie) => {
            if(serie.type === "time") time += serie.value;
            else if(serie.type === "repeat") time += serie.value*4;
        });
    });
    

    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.card}>
                <View>
                    <H4>{workout.name}</H4>
                    <View style={styles.rowContainer}>
                        <Small>Blocos: {blocks}</Small>
                        <Small>Series: {series}</Small>
                        <Small>Tempo: {(time/60).toFixed(1)} min</Small>
                    </View>
                </View>
                {action && 
            <View style={styles.rowContainer}>
                <ButtonIcon
                    iconName="edit"
                    color={theme.colors.onSurface}
                    onPress={onEdit}
                />
                <ButtonIcon
                    iconName="delete"
                    color={isPendingDel ? theme.colors.onSurface : theme.colors.error}
                    onPress={onDelete}
                    disabled={isPendingDel}
                />
            </View>}
            </View>
        </TouchableOpacity>
    );
}