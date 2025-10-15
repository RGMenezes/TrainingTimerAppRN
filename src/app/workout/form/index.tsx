import { createWorkout, fetchWorkoutById, updateWorkout } from "@/api/workoutApi";
import { AppBar, BlockForm, BoxMessage, Button, Input, Loading } from "@/component";
import ViewMain from "@/component/layout/ViewMain";
import { Block, Workout } from "@/model";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { Alert, ScrollView, StyleSheet, View } from "react-native";
import { v4 as uuidv4 } from "uuid"; // Para IDs únicos

const initialWorkoutState: Omit<Workout, "id"> = {
    name: "",
    blocks: [],
    createDate: new Date(),
    updateDate: new Date()
};

export default function WorkoutFormScreen() {
    const styles = StyleSheet.create({
        scrollContainer: {
            paddingLeft: 16,
            paddingRight: 16
        },
        container: {
            gap: 20
        },
        buttonContainer: {
            padding: 16,
            paddingTop: 0
        },
        spacing: {
            height: 15
        }
    });
    const [msgError, setMsgError] = useState<string>();
    const [msgSuccess, setMsgSuccess] = useState<string>();
    const params = useLocalSearchParams();
    const id = params.id as string | undefined;
    const queryClient = useQueryClient();
    const isEditMode = !!id;

    const { data: fetchedWorkout, isLoading } = useQuery({
        queryKey: ["workout", id],
        queryFn: () => fetchWorkoutById(id!), 
        enabled: isEditMode,
    });

    const [workoutData, setWorkoutData] = useState<Workout | Omit<Workout, "id">>(initialWorkoutState);

    useEffect(() => {
        if (fetchedWorkout) {
            setWorkoutData(fetchedWorkout);
        }
    }, [fetchedWorkout]);

    const mutation = useMutation({
        mutationFn: isEditMode ? updateWorkout : createWorkout,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["workouts"] });
            if (isEditMode) queryClient.invalidateQueries({ queryKey: ["workout", id] }); 
            
            setMsgSuccess(`Treino ${isEditMode ? "atualizado" : "criado"} com sucesso!`);
        },
        onError: (error) => {
            setMsgError(`Falha ao ${isEditMode ? "atualizar" : "criar"} o treino.`);
            console.error(error);
        }
    });

    const handleBlockUpdate = (updatedBlock: Block) => {
        setWorkoutData(prev => ({
            ...prev,
            blocks: prev.blocks.map(block => 
                block.id === updatedBlock.id ? updatedBlock : block
            ),
        }));
    };

    const handleDeleteBlock = (blockId: string) => {
        setWorkoutData(prev => ({
            ...prev,
            blocks: prev.blocks.filter(block => block.id !== blockId)
        }));
    };
    
    const handleAddBlock = () => {
        const newBlock: Block = {
            id: uuidv4(),
            name: `Bloco ${workoutData.blocks.length + 1}`,
            series: [{ id: uuidv4(), name: "Nova Série", type: "repeat", value: 10, rest: 0 }],
            rest: 0,
        };
        setWorkoutData(prev => ({
            ...prev,
            blocks: [...prev.blocks, newBlock]
        }));
    };

    const handleSubmit = () => {
        if (!workoutData.name.trim()) {
            setMsgError("O nome do treino é obrigatório.");
            return;
        }
        if(isEditMode){
            workoutData.updateDate = new Date();
        }else{
            workoutData.createDate = new Date();
            workoutData.updateDate = new Date();
        }
        mutation.mutate(workoutData as Workout); // O `as Workout` é necessário se for UPDATE
    };

    if (isLoading) return <ViewMain><Loading /></ViewMain>;

    return (
        <ViewMain style={styles.container}>
            {msgError && <BoxMessage type="error" message={msgError} onClose={() => setMsgError(undefined)}/>}
            {msgSuccess && 
                <BoxMessage type="success" message={msgSuccess} onClose={() => {
                    setMsgSuccess(undefined);
                    router.navigate("/workout");
                }}/>
            }
            <AppBar back title={isEditMode ? "Editar Treino" : "Criar Novo Treino"} />

            <ScrollView style={styles.scrollContainer} >
                <Input
                    label="Título do treino"
                    value={workoutData.name}
                    onChangeText={(text) => setWorkoutData(prev => ({ ...prev, name: text }))}
                    placeholder="Título do treino"
                />

                {workoutData.blocks.map((block) => (
                    <View key={block.id + "_container"}>
                        <View style={styles.spacing}/>
                        <BlockForm
                            key={block.id}
                            block={block}
                            onBlockUpdate={handleBlockUpdate}
                            onDelete={() => handleDeleteBlock(block.id)}
                        />
                    </View>
                ))}

                <View style={styles.spacing}/>
                <Button title="Adicionar Novo Bloco" onPress={handleAddBlock} />
            </ScrollView>

            <View style={styles.buttonContainer}>
                <Button
                    title={mutation.isPending
                        ? `Salvando...`
                        : `${isEditMode ? "Salvar Edição" : "Salvar Treino"}`
                    }
                    type="success"
                    onPress={handleSubmit}
                    disabled={mutation.isPending}
                />
            </View>
        </ViewMain>
    );
}