import { Workspace } from "@rbxts/services";

export type QuizWarpWorkspace = Workspace & {
    Lobby: Lobby;
    DeathRoom: DeathRoom;
    Levels: Folder;
};

export type DeathRoom = Folder & {
    StartLocations: Folder;
};

export type Lobby = Folder & {
    SpawnLocation: SpawnLocation;
    Telepads: Folder;
};

export const quizWorkspace = Workspace as QuizWarpWorkspace;
