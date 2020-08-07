import { EvaluateInstanceTree } from "@rbxts/validate-tree";
import { Level } from "./Level";
import { ServerStorage } from "@rbxts/services";

export const QuizServerStorage = {
	$className: "ServerStorage",
	TagList: "Folder",
	Level: Level,
	SpawnLocations: {
		$className: "Folder",
		Spawn4: {
			$className: "SpawnLocation",
			TouchInterest: "TouchTransmitter",
			Decal: "Decal",
		},
		Spawn3: {
			$className: "SpawnLocation",
			TouchInterest: "TouchTransmitter",
			Decal: "Decal",
		},
		Spawn5: {
			$className: "SpawnLocation",
			TouchInterest: "TouchTransmitter",
			Decal: "Decal",
		},
		Spawn1: {
			$className: "SpawnLocation",
			TouchInterest: "TouchTransmitter",
			Decal: "Decal",
		},
		Spawn2: {
			$className: "SpawnLocation",
			TouchInterest: "TouchTransmitter",
			Decal: "Decal",
		},
	},
} as const;

export type QuizServerStorage = EvaluateInstanceTree<typeof QuizServerStorage>;

export const quizServerStorage = ServerStorage as QuizServerStorage;
