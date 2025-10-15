import { deleteWorkout, fetchWorkouts } from "@/api/workoutApi";
import { AppBar, BoxMessage, ButtonIcon, Loading, ViewError, WorkoutCard } from "@/component";
import ViewMain from "@/component/layout/ViewMain";
import { useTheme } from "@/hook";
import { Workout } from "@/model";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { router } from "expo-router";
import React, { useState } from "react";
import { FlatList, StyleSheet, Text } from "react-native";

export default function WorkoutScreen() {
    const [message, setMessage] = useState<[string, string]>();
    const { colors } = useTheme();
    const queryClient = useQueryClient();
    const styles = StyleSheet.create({
        listContainer: {
            padding: 16,
        }
    });

    const { 
        data: workouts, 
        isLoading, 
        isError, 
        refetch
    } = useQuery<Workout[]>({
        queryKey: ["workouts"],
        queryFn: fetchWorkouts,
    });

    const deleteMutation = useMutation({
        mutationFn: deleteWorkout,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["workouts"] }),
    });

    if (isLoading) {
        return (
            <ViewMain>
                <AppBar title="Meus Treinos" />
                <Loading />
            </ViewMain>
        );
    }

    if (isError) {
        return (
            <ViewMain>
                <AppBar title="Meus Treinos" />
                <ViewError message="Erro ao carregar Workouts!" onPress={() => refetch()}/>
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
                        isPendingDel={message && message[0] === item.id && (deleteMutation.isPending || queryClient.isFetching() !== 0)} 
                        onDelete={() => setMessage([item.id, `Deseja mesmo apagar o treino ${item.name}?`])}
                        onEdit={() => router.push({pathname: "/workout/form", params: {id: item.id}})}

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
                onPress={() => router.navigate("/workout/form")}    
            />
        </ViewMain>
    );
}