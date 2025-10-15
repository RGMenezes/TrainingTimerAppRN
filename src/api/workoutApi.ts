import { Workout } from "@/model"; // Ajuste o path conforme sua estrutura
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
// 💡 Import para persistência local
import AsyncStorage from "@react-native-async-storage/async-storage";

const WORKOUTS_STORAGE_KEY = "@TrainingTimer:workouts";

// --- Funções de Ajuda para Persistência (I/O) ---

// Carrega a lista completa da memória interna
const loadWorkouts = async (): Promise<Workout[]> => {
    try {
        const data = await AsyncStorage.getItem(WORKOUTS_STORAGE_KEY);
        // Se não houver dados, retorna um array vazio
        return data ? JSON.parse(data) : [];
    } catch (e) {
        console.error("Erro ao carregar Workouts do AsyncStorage:", e);
        return [];
    }
};

// Salva a lista completa na memória interna
const saveWorkouts = async (workouts: Workout[]): Promise<void> => {
    try {
        const jsonWorkouts = JSON.stringify(workouts);
        await AsyncStorage.setItem(WORKOUTS_STORAGE_KEY, jsonWorkouts);
    } catch (e) {
        console.error("Erro ao salvar Workouts no AsyncStorage:", e);
        throw new Error("Falha na persistência de dados.");
    }
};

// --- Funções CRUD (Reutilizadas pelo React Query) ---

// 1. READ ALL: Buscar todos os Workouts
export const fetchWorkouts = async (): Promise<Workout[]> => {
    // Chama a função de I/O
    return loadWorkouts();
};

// 2. READ BY ID: Buscar por ID
export const fetchWorkoutById = async (id: string): Promise<Workout | undefined> => {
    const workouts = await loadWorkouts();
    return workouts.find(w => w.id === id);
};

// 3. CREATE: Criar um novo Workout
export const createWorkout = async (workoutData: Omit<Workout, "id">): Promise<Workout> => {
    // Adiciona o ID único e as datas
    const newWorkout: Workout = { 
        ...workoutData, 
        id: uuidv4(), 
        createDate: new Date(), 
        updateDate: new Date(),
    } as Workout;

    const workouts = await loadWorkouts();
    workouts.push(newWorkout);
    await saveWorkouts(workouts);
    return newWorkout;
};

// 4. UPDATE: Atualizar um Workout
export const updateWorkout = async (updatedWorkout: Workout): Promise<Workout> => {
    const workouts = await loadWorkouts();
    
    // Atualiza a data
    const finalWorkout = { ...updatedWorkout, updateDate: new Date() };

    const index = workouts.findIndex(w => w.id === finalWorkout.id);

    if (index === -1) {
        throw new Error("Workout não encontrado para atualização.");
    }

    workouts[index] = finalWorkout;
    await saveWorkouts(workouts);
    return finalWorkout;
};

// 5. DELETE: Excluir um Workout
export const deleteWorkout = async (id: string): Promise<void> => {
    let workouts = await loadWorkouts();
    
    const workoutsBefore = workouts.length;
    workouts = workouts.filter(w => w.id !== id);
    
    if (workouts.length === workoutsBefore) {
        throw new Error("Workout não encontrado para exclusão.");
    }

    await saveWorkouts(workouts);
};