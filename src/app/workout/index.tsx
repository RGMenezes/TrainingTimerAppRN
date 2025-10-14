import { deleteWorkout, fetchWorkouts } from "@/api/workoutApi";
import { AppBar, BoxMessage, Button, ButtonIcon, WorkoutCard } from "@/component";
import ViewMain from "@/component/layout/ViewMain";
import { useTheme } from "@/hook";
import { Workout } from "@/model";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

export default function WorkoutScreen() {
    const [message, setMessage] = useState<[string, string]>();
    const { colors } = useTheme();
    const queryClient = useQueryClient();

    // 1. QUERY: Buscar e gerenciar a lista de Workouts
    const { 
        data: workouts, 
        isLoading, 
        isError, 
        refetch // Função para forçar a atualização manual, se necessário
    } = useQuery<Workout[]>({
        queryKey: ["workouts"], // Chave de cache
        queryFn: fetchWorkouts, // A função assíncrona que chama a API (Mock ou real)
    });

    const deleteMutation = useMutation({
        mutationFn: deleteWorkout,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["workouts"] });
        },
    });

    if (isLoading) {
        return (
            <ViewMain>
                <AppBar title="Meus Treinos" />
            </ViewMain>
        );
    }

    if (isError) {
        return (
            <ViewMain>
                <AppBar title="Meus Treinos" />
                <View style={styles.centerContainer}>
                    <Text style={{ color: colors.error, fontSize: 16 }}>
                        Erro ao carregar Workouts.
                    </Text>
                    <Button title="Tentar Novamente" onPress={() => refetch()} />
                </View>
            </ViewMain>
        );
    }

    return (
        <ViewMain>
            {message && message[1].length !== 0 && (
                <BoxMessage message={message[1]} onClose={() => setMessage([message[0], ""])} onConfirm={() => deleteMutation.mutate(message[0])}/>
            )}
            <AppBar title="Meus Treinos" />
            <FlatList
                data={workouts}
                keyExtractor={(item) => item.id}
                renderItem={({ item }: { item: Workout }) => <>
                    <WorkoutCard 
                        workout={item} 
                        isPendingDel={message && message[0] == item.id && deleteMutation.isPending} 
                        onDelete={() => setMessage([item.id, `Deseja mesmo apagar o treino ${item.name}?`])}
                    />
                </>}
                ListEmptyComponent={() => (
                    <Text style={[{ color: colors.onBackground, textAlign: "center", marginTop: 20 }]}>
                        Nenhum treino encontrado.
                    </Text>
                )}
                contentContainerStyle={styles.listContainer}
            />

            <ButtonIcon 
                iconName="add" elevated position="right bottom" size="medium"
                onPress={() => console.log("Navegar para criar novo Workout")}    
            />
        </ViewMain>
    );
}

const styles = StyleSheet.create({
    centerContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    listContainer: {
        padding: 16,
    }
});