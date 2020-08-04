import { ServerStorage } from "@rbxts/services";

export type QuizServerStorage = ServerStorage & {
    Level: Model;
    SpawnLocations: Folder;
};

export const quizServerStorage = ServerStorage as QuizServerStorage;
