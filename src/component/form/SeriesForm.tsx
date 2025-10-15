import Input from "@/component/form/Input";
import { useTheme } from "@/hook";
import { Series } from "@/model";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import ButtonIcon from "../button/ButtonIcon";
import ViewForm from "../layout/ViewForm";
import H4 from "../text/H4";

interface SeriesFormProps {
    series: Series;
    onUpdate: (updatedSeries: Series) => void;
    onDelete: () => void;
}

export default function SeriesForm({ series, onUpdate, onDelete }: SeriesFormProps) {
    const theme = useTheme();
    const styles = StyleSheet.create({
        container: {
            padding: 12,
            boxShadow: theme.colors.shadow,
            borderRadius: theme.borderRadius,
            backgroundColor: theme.colors.surface,
        },
        header: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 8,
        },
        rowContainer: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 10
        }
    });
    const [name, setName] = useState(series.name);
    const [value, setValue] = useState(String(series.value)); 
    const [rest, setRest] = useState(String(series.rest));
    const [type, setType] = useState(series.type);

    function handlerUpdateSeries(){
        const updatedSeries: Series = {
            ...series,
            name: name,
            value: Number(value) || 0, 
            rest: Number(rest) || 0,
        };
        onUpdate(updatedSeries);
    };

    return (
        <ViewForm scrollable style={styles.container}>
            <View style={styles.header}>
                <H4>{name}</H4>
                <ButtonIcon iconName="delete" color={theme.colors.error} onPress={onDelete} />
            </View>

            <Input
                label="Exercício: "
                onChangeText={setName}
                onBlur={handlerUpdateSeries}
                value={name}
                placeholder="Nome do Exercício"
            />

            <View style={styles.rowContainer}>
                <Input
                    style={{width: 200}}
                    label={type === "time" ? "Tempo: " : "Repetições: "}
                    onChangeText={setValue}
                    onBlur={handlerUpdateSeries}
                    value={value}
                    placeholder={`Valor (${type === "time" ? "segundos" : "repetições"})`}
                    keyboardType="numeric"
                />
                <ButtonIcon color={type === "repeat" ? theme.colors.primary : theme.colors.onSurface} iconName="repeat" onPress={() => setType("repeat")}/>
                <ButtonIcon color={type === "time" ? theme.colors.primary : theme.colors.onSurface} iconName="timer" onPress={() => setType("time")}/>
            </View>
            
            <Input
                label="Descanso: "
                onChangeText={setRest}
                onBlur={handlerUpdateSeries}
                value={rest}
                placeholder="Descanso (segundos)"
                keyboardType="numeric"
            />
        </ViewForm>
    );
}