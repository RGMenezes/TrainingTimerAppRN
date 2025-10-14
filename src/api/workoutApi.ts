import { Workout } from "@/model/Workout";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

// Simula o "Banco de Dados" Local (como a Box do Hive)
let workoutsDB: Workout[] = [
    { id: "mock-1", name: "Treino de Exemplo A", blocks: [], isFavorite: true },
    { id: "mock-2", name: "Treino de Exemplo B", blocks: [], isFavorite: false },
    { id: "mock-3", name: "Treino de Exemplo C", blocks: [], isFavorite: false },
    { id: "mock-4", name: "Treino de Exemplo D", blocks: [], isFavorite: false },
    { id: "mock-5", name: "Treino de Exemplo E", blocks: [], isFavorite: false },
    { id: "mock-6", name: "Treino de Exemplo F", blocks: [], isFavorite: false },
    { id: "mock-7", name: "Treino de Exemplo G", blocks: [], isFavorite: false },
    { id: "mock-8", name: "Treino de Exemplo H", blocks: [], isFavorite: false },
    { id: "mock-9", name: "Treino de Exemplo I", blocks: [], isFavorite: false },
    { id: "mock-10", name: "Treino de Exemplo J", blocks: [], isFavorite: false },
    { id: "mock-11", name: "Treino de Exemplo K", blocks: [], isFavorite: true },
    { id: "mock-12", name: "Treino de Exemplo L", blocks: [], isFavorite: false },
    { id: "mock-13", name: "Treino de Exemplo M", blocks: [], isFavorite: false },
    { id: "mock-14", name: "Treino de Exemplo N", blocks: [], isFavorite: false },
    { id: "mock-15", name: "Treino de Exemplo O", blocks: [], isFavorite: false },
    { id: "mock-16", name: "Treino de Exemplo P", blocks: [], isFavorite: false },
    { id: "mock-17", name: "Treino de Exemplo Q", blocks: [], isFavorite: false },
    { id: "mock-18", name: "Treino de Exemplo R", blocks: [], isFavorite: false },
    { id: "mock-19", name: "Treino de Exemplo S", blocks: [], isFavorite: false },
];

// --- Funções CRUD Assíncronas ---

// GET: Simula a busca de todos os Workouts
export const fetchWorkouts = (): Promise<Workout[]> => {
    return new Promise((resolve) => {
        // Simula o atraso de rede (500ms)
        setTimeout(() => {
            resolve(workoutsDB);
        }, 500); 
    });
};

// POST: Simula a criação de um novo Workout
export const createWorkout = (workoutData: Omit<Workout, "id">): Promise<Workout> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const newWorkout: Workout = { 
                ...workoutData, 
                id: uuidv4(), 
                isFavorite: false 
            };
            workoutsDB.push(newWorkout);
            resolve(newWorkout);
        }, 500);
    });
};

// DELETE: Simula a exclusão de um Workout
export const deleteWorkout = (id: string): Promise<void> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            workoutsDB = workoutsDB.filter(w => w.id !== id);
            resolve();
        }, 500);
    });
};