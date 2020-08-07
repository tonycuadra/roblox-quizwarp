import { EvaluateInstanceTree } from "@rbxts/validate-tree";

export const Lobby = {
	$className: "Folder",
	Baseplate: "Part",
	LevelCompleteEvent: "RemoteEvent",
	Walls: {
		$className: "Folder",
		["Back Wall"]: {
			$className: "Part",
			Weld: "Weld",
		},
		["Front Wall"]: {
			$className: "Part",
			Weld: "Weld",
		},
		["Left Wall"]: {
			$className: "Part",
			Weld: "Weld",
		},
		["Right Wall"]: {
			$className: "Part",
			Weld: "Weld",
		},
	},
	StartSpawn: {
		$className: "SpawnLocation",
		TouchInterest: "TouchTransmitter",
		Decal: "Decal",
	},
	Telepads: "Folder",
} as const;

export type Lobby = EvaluateInstanceTree<typeof Lobby>;
