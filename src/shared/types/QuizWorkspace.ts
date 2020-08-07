import { EvaluateInstanceTree } from "@rbxts/validate-tree";
import { DeathRoom } from "./DeathRoom";
import { Lobby } from "./Lobby";
import { Workspace } from "@rbxts/services";

export const QuizWorkspace = {
	$className: "Workspace",
	DeathRoom: DeathRoom,
	Lobby: Lobby,
	Levels: "Folder",
	Terrain: "Terrain",
	Music: "Sound",
	Camera: "Camera",
} as const;

export type QuizWorkspace = EvaluateInstanceTree<typeof QuizWorkspace>;

export const quizWorkspace = Workspace as QuizWorkspace;
