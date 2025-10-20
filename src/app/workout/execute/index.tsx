import { fetchWorkoutById } from "@/api/workoutApi";
import { Controls, H1, Loading, P, Stepper, Timer, TStepper, ViewMain } from "@/component";
import { useSoundPlayer, useTheme } from "@/hook";
import { useQuery } from "@tanstack/react-query";
import { useKeepAwake } from "expo-keep-awake";
import { router, useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

interface IStep {
    name: string;
    value: number;
    msg?: string;
    serieType?: "repeat" | "time";
    type: TStepper;
    backgroundColor?: string;
};

export default function ExecuteWorkout(){
    useKeepAwake();
    const params = useLocalSearchParams();
    const id = params.id as string | undefined;
    const theme = useTheme();
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
    const { playSound, isLoaded } = useSoundPlayer();

    const [steps, setSteps] = useState<IStep[]>([]);
    const [step, setStep] = useState<IStep>();
    const [timer, setTimer] = useState(0);
    const [pause, setPause] = useState(true);
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
                    serieType: serie.type,
                    backgroundColor: theme.colors.playerExercise
                });
                if(serieI < block.series.length-1){
                    steps.push({
                        name: "Descanso entre exercícios",
                        value: serie.rest,
                        msg: `Próximo\n${block.series[serieI + 1].name}`,
                        type: "restSerie",
                        backgroundColor: theme.colors.playerRestSeries
                    });
                }
            });
            if(blockI < workout.blocks.length-1){
                steps.push({
                    name: "Descanso entre blocos",
                    value: block.rest,
                    msg: `Próximo\n${workout.blocks[blockI + 1].series[0].name}`,
                    type: "restBlock",
                    backgroundColor: theme.colors.playerRestBlock
                });
            }
        });
        setSteps(steps);
        setStep(steps[0]);
        setStepIndex(0);

    }, [fetchedWorkout, id, isLoading, theme]);

    const handleBack = () => {
        if(stepIndex > 0) setStepIndex(stepIndex - 1);
    };
    const handleNext = useCallback(() => {
        if(steps.length - 1 > stepIndex) setStepIndex(stepIndex + 1);
    }, [stepIndex, steps.length]);
    const handlePause = () => {
        playSound("pause");
        setPause(!pause);
    };

    useEffect(() => {
        const newStep = steps[stepIndex];
        if(!newStep) return;

        setStep(newStep);
        setTimer(newStep.value);
        if(newStep.serieType === "repeat") setPause(true);
        else setPause(false);
    }, [stepIndex, steps]);

    useEffect(() => {

        if(pause) return;
        if(timer <= 3 && timer >= 1){
            playSound("countdown");
        }else if(timer === 0){
            playSound("end");
            handleNext();
        }
        
        const intervalId = setInterval(() => setTimer(timer - 1), 1000);
        return () => clearInterval(intervalId);
    }, [timer, pause, handleNext, playSound]);

    if (isLoading || !isLoaded) return <ViewMain><Loading /></ViewMain>;
    return (
        <ViewMain style={{backgroundColor: step?.backgroundColor}}>
            <Stepper value={stepIndex} typeSteps={steps.map(item => item.type)} />
            <View style={styles.containerScreen}>
                <View style={styles.containerH1}>
                    <H1 style={styles.text}>{step?.name}</H1>
                </View>
                <Timer backgroundColor={step?.backgroundColor} value={timer} total={step?.value}/>
                <Controls 
                    onBack={handleBack} isDisableBack={stepIndex === 0} 
                    onPause={handlePause} isPause={pause} isDisablePause={step?.serieType === "repeat"}
                    onNext={handleNext} isDisableNext={stepIndex === steps.length - 1}
                />
                <View style={styles.containerP}>
                    <P style={styles.text}>{step?.msg}</P>
                </View>
            </View>
        </ViewMain>
    );
}