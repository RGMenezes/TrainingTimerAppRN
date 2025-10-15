import { Button, ButtonIcon, H4, Input, SeriesForm } from "@/component";
import { useTheme } from "@/hook";
import { Block, Series } from "@/model";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { v4 as uuidv4 } from "uuid";

interface BlockFormProps {
    block: Block;
    onBlockUpdate: (updatedBlock: Block) => void; 
    onDelete: () => void;
}

export default function BlockForm({ block, onBlockUpdate, onDelete }: BlockFormProps) {
    const { colors } = useTheme();
    const [show, setShow] = useState(false);
    const styles = StyleSheet.create({
        container: {
            height: show ? "auto" : 60,
            padding: 16,
            gap: 15,
            overflow: "hidden",
            borderTopWidth: 2,
            borderColor: colors.onBackground
        },
        header: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
        },
        inputContainer: {
            gap: 10,
        },
        rowContainer: {
            flexDirection: "row",
            alignItems: "center",
            gap: 5
        }
    });

    const [name, setName] = useState(block.name);
    const [rest, setRest] = useState(String(block.rest));

    const handleSeriesUpdate = (updatedSeries: Series) => {
        const newSeriesList = block.series.map(s => 
            s.id === updatedSeries.id ? updatedSeries : s
        );
        onBlockUpdate({ ...block, series: newSeriesList });
    };

    const handleDeleteSeries = (seriesId: string) => {
        const newSeriesList = block.series.filter(s => s.id !== seriesId);
        onBlockUpdate({ ...block, series: newSeriesList });
    };

    const handleAddSeries = () => {
        const newSeries: Series = {
            id: uuidv4(),
            name: `Série ${block.series.length + 1}`,
            type: "repeat",
            value: 10,
            rest: 0,
        };
        const newSeriesList = [...block.series, newSeries];
        onBlockUpdate({ ...block, series: newSeriesList });
    };

    function handlerUpdateBlock() {
        const updatedBlock: Block = {
            ...block,
            name: name,
            rest: Number(rest) || 0,
        };
        onBlockUpdate(updatedBlock);
    }; 

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.rowContainer}>
                    <ButtonIcon size="large" iconName={show ? "arrow-drop-up" : "arrow-drop-down"} color={colors.onBackground} onPress={() => setShow(!show)}/>
                    <H4>{name}</H4>
                </View>
                <ButtonIcon iconName="delete" color={colors.error} onPress={onDelete} />
            </View>

            <View style={styles.inputContainer}>
                <Input
                    label="Nome: "
                    onChangeText={setName}
                    onBlur={handlerUpdateBlock}    
                    value={name}
                    placeholder="Nome do Bloco"
                />
                <Input
                    label="Descanso: "
                    onChangeText={setRest}
                    onBlur={handlerUpdateBlock}    
                    value={rest}
                    placeholder="Descanso Após"
                    keyboardType="numeric"
                />
            </View>

            {block.series.map((series) => (
                <SeriesForm
                    key={series.id}
                    series={series}
                    onUpdate={handleSeriesUpdate} 
                    onDelete={() => handleDeleteSeries(series.id)}
                />
            ))}

            <Button title="Adicionar Série" onPress={handleAddSeries} />
        </View>
    );
}