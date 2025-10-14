export interface Series {
    id: string; 
    name: string;
    type: "Repetições" | "Tempo"; 
    value: number; 
    restAfter: number; 
}

export interface Block {
    id: string;
    name: string;
    series: Series[]; 
    repetitions: number; 
    restAfterBlock: number; 
}

export interface Workout {
    id: string;
    name: string;
    blocks: Block[];
    description?: string;
    isFavorite: boolean;
}