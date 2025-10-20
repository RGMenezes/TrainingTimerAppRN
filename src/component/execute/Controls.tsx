import { useTheme } from "@/hook";
import { StyleSheet, View } from "react-native";
import ButtonIcon from "../button/ButtonIcon";

interface ControlsProps { 
    onBack: () => void;
    isDisableBack?: boolean
    onNext: () => void;
    isDisableNext?: boolean
    onPause: () => void; 
    isDisablePause?: boolean
    isPause?: boolean;
}

export default function Controls({ onBack, isDisableBack, onNext, isDisableNext, onPause, isDisablePause, isPause }: ControlsProps){
    const theme = useTheme();
    const styles = StyleSheet.create({
        container: {
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: 10,
        }
    });
    return (
        <View style={styles.container}>
            <ButtonIcon 
                size="xLarge"
                disabled={isDisableBack}
                color={isDisableBack ? theme.colors.contrast : theme.colors.onBackground} 
                onPress={() => {
                    if(!isDisableBack) onBack();
                }}
                iconName="arrow-back" 
            />
            <ButtonIcon 
                size="xLarge"
                disabled={isDisablePause}
                color={isDisablePause ? theme.colors.contrast : theme.colors.onBackground} 
                onPress={() => {
                    if(!isDisablePause) onPause();
                }}
                iconName={isDisablePause ? "fitness-center" : isPause ? "play-arrow" : "pause"} 
            />
            <ButtonIcon 
                size="xLarge"
                disabled={isDisableNext}
                color={isDisableNext ? theme.colors.contrast : theme.colors.onBackground} 
                onPress={() => {
                    if(!isDisableNext) onNext();
                }}
                iconName="arrow-forward" 
            />
        </View>
    );
}