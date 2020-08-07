import { EvaluateInstanceTree } from "@rbxts/validate-tree";

export const Telepad = {
    $className: "Model",
    TeleportSound: "Sound",
    Portal: {
        $className: "Part",
        SurfaceGui: {
            $className: "SurfaceGui",
            TextLabel: "TextLabel",
        },
        Tag: "StringValue",
    },
    Parts: "Folder",
} as const;

export type Telepad = EvaluateInstanceTree<typeof Telepad>;

export const Level = {
	$className: "Model",
	StartLocation: "Part",
	Walls: {
		$className: "Folder",
		RightWall: {
			$className: "Part",
			Weld: "Weld",
		},
		FrontWall: {
			$className: "Part",
			SurfaceGui: {
				$className: "SurfaceGui",
				LevelName: "TextLabel",
				Question: "TextLabel",
			},
		},
		LeftWall: {
			$className: "Part",
			Weld: "Weld",
		},
		BackWall: {
			$className: "Part",
			Weld: "Weld",
		},
	},
	Baseplate: "Part",
	Telepads: {
		$className: "Folder",
		["Telepad 1"]: Telepad,
		["Telepad 2"]: Telepad,
		["Telepad 3"]: Telepad,
		["Telepad 4"]: Telepad,
	},
} as const;

export type Level = EvaluateInstanceTree<typeof Level>;
