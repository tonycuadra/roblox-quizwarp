import { EvaluateInstanceTree } from "@rbxts/validate-tree";

export const DeathRoom = {
	$className: "Folder",
	Baseplate: "Part",
	Lava: {
		$className: "Part",
		Glow: "ParticleEmitter",
		Flames: "ParticleEmitter",
		Script: "Script",
	},
	DeathScream: "Sound",
	StartLocations: "Folder",
	Walls: {
		$className: "Folder",
		["Back Wall"]: {
			$className: "Part",
			Weld: "Weld",
		},
		["Front Wall"]: "Part",
		["Left Wall"]: {
			$className: "Part",
			Weld: "Weld",
		},
		["Right Wall"]: {
			$className: "Part",
			Weld: "Weld",
		},
	},
} as const;

export type DeathRoom = EvaluateInstanceTree<typeof DeathRoom>;
