import { Workspace } from "@rbxts/services";

export type QuizWarpWorkspace = Workspace & {
    Lobby: Lobby;
    DeathRoom: DeathRoom;
    Levels: Folder;
    Music: Sound;
};

export type DeathRoom = Folder & {
    StartLocations: Folder;
    DeathScream: Sound;
};

export type Lobby = Folder & {
    SpawnLocation: SpawnLocation;
    Telepads: Folder;
};

export const quizWorkspace = Workspace as QuizWarpWorkspace;
