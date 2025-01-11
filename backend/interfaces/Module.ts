import { Evaluation } from './Evaluation'

export interface Module {
    id: string;
    libelle: string;
    codeapogee: string;
    heures: {
        CM: number;
        TD: number;
        TP: number;
    };
    evaluations: Evaluation[];
}
