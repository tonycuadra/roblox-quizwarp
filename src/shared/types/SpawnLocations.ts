import { EvaluateInstanceTree } from "@rbxts/validate-tree";

export const SpawnLocations = {
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
} as const;

export type SpawnLocations = EvaluateInstanceTree<typeof SpawnLocations>;
