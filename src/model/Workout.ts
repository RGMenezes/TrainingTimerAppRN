export interface Series {
    id: string; 
    name: string;
    type: "repeat" | "time"; 
    value: number; 
    rest: number; 
}

export interface Block {
    id: string;
    name: string;
    series: Series[];
    rest: number; 
}

export interface Workout {
    id: string;
    name: string;
    blocks: Block[];
    createDate: Date;
    updateDate: Date;
    lastUse?: Date;
}