import { useTheme } from "@/hook";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export type TStepper = "serie" | "restSerie" | "start" | "end" | "restBlock";

export default function Stepper({ value, typeSteps }: { value: number, typeSteps: TStepper[] }){
    const insets = useSafeAreaInsets();
    const { colors, iconSize } = useTheme();
    const styles = StyleSheet.create({
        container: {
            padding: 16,
            paddingTop: insets.top + 16,
            paddingBottom: 0,

            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
            gap: 5,
        }
    });

    const steps = typeSteps.map((step, index) => {
        const newStep = {
            name: "circle" as React.ComponentProps<typeof MaterialIcons>["name"],
            size: iconSize.small / 2,
            color: colors.onBackground,
            key: "step_" + index
        };

        if(step === "restBlock") {
            newStep.name = "square";
        }else if(step === "restSerie") {
            newStep.name = "stars";
        }

        if(index === value) newStep.size = iconSize.small;
        return newStep;
    });

    return(
        <View style={styles.container}>
            {steps.map(({name, size, key, color}) => (
                <MaterialIcons name={name} size={size} key={key} color={color}/>
            ))}
        </View>
    );
}