import { fetchWorkoutById } from "@/api/workoutApi";
import { Controls, H1, Loading, P, Stepper, Timer, TStepper, ViewMain } from "@/component";
import { useQuery } from "@tanstack/react-query";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

interface IStep {
    name: string;
    value: number;
    msg?: string;
    serieType?: "repeat" | "time";
    type: TStepper;
};

export default function ExecuteWorkout(){
    const params = useLocalSearchParams();
    const id = params.id as string | undefined;
    const styles = StyleSheet.create({ 
        containerScreen: {
            padding: 16,
            flex: 1,

            justifyContent: "center",
            alignItems: "center",
            gap: 30
        },
        text: {
            textAlign: "center",
        },
        containerH1: {
            flex: 1,
            justifyContent: "flex-end",
            alignItems: "center"
        }, 
        containerP: {
            flex: 1,
            alignItems: "center"
        }
    });
    
    const { data: fetchedWorkout, isLoading } = useQuery({
        queryKey: ["workout", id],
        queryFn: () => fetchWorkoutById(id!)
    });

    const [steps, setSteps] = useState<IStep[]>([]);
    const [step, setStep] = useState<IStep>();
    const [timer, setTimer] = useState(0);
    const [stepIndex, setStepIndex] = useState(0);
    
    useEffect(() => {
        if(!id){
            console.log("Id do treino ausente!");
            router.back();
            return;
        }
        
        if(isLoading) return;

        const workout = fetchedWorkout;
        if (!workout) {
            console.log("Treino não encontrado!");
            router.back();
            return;
        }

        //Parse, transformando o treino em uma lista de etapas
        const steps: IStep[] = [];
        workout.blocks.map((block, blockI) => {
            block.series.map((serie, serieI) => {
                let type: TStepper = "serie";
                if(steps.length === 0) type = "start";
                if(serieI === block.series.length-1 && blockI === workout.blocks.length-1) type = "end";
                steps.push({
                    name: serie.name,
                    value: serie.value,
                    type,
                    msg: serie.msg,
                    serieType: serie.type
                });
                if(serieI < block.series.length-1){
                    steps.push({
                        name: "Descanso entre exercícios",
                        value: serie.rest,
                        msg: `Próximo\n${block.series[serieI + 1].name}`,
                        type: "restSerie",
                    });
                }
            });
            if(blockI < workout.blocks.length-1){
                steps.push({
                    name: "Descanso entre blocos",
                    value: block.rest,
                    msg: `Próximo\n${workout.blocks[blockI + 1].series[0].name}`,
                    type: "restBlock"
                });
            }
        });
        setSteps(steps);
        setStep(steps[0]);
        setStepIndex(0);

    }, [fetchedWorkout, id, isLoading]);

    const handleBack = () => {
        if(stepIndex > 0) setStepIndex(stepIndex - 1);
    };
    const handleNext = () => {
        if(steps.length - 1 > stepIndex) setStepIndex(stepIndex + 1);
    };

    useEffect(() => {
        setStep(steps[stepIndex]);
    }, [stepIndex, steps]);

    if (isLoading) return <ViewMain><Loading /></ViewMain>;
    return (
        <ViewMain>
            <Stepper value={stepIndex} typeSteps={steps.map(item => item.type)} />
            <View style={styles.containerScreen}>
                <View style={styles.containerH1}>
                    <H1 style={styles.text}>{step?.name}</H1>
                </View>
                <Timer value={timer} total={step?.value}/>
                <Controls 
                    onBack={handleBack} isDisableBack={stepIndex === 0} 
                    onPause={() => {}} 
                    onNext={handleNext} isDisableNext={stepIndex === steps.length - 1}
                />
                <View style={styles.containerP}>
                    <P style={styles.text}>{step?.msg}</P>
                </View>
            </View>
        </ViewMain>
    );
}