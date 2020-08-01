import inspect from '@rbxts/inspect';

import { BaseController } from 'shared/BaseController';
import { TeleportController } from './TeleportController';
import { LevelConfig } from 'shared/LevelConfig'
import { DeathRoomController } from './DeathRoomController';
import { quizWorkspace } from 'shared/QuizWarpWorkspace';
import { Level } from 'shared/Level';
import { PLAYER_ROOT_OFFSET } from 'shared/PlayerManager';
import { TelepadModel } from 'shared/Telepad';

export class LevelController extends BaseController<Level> {

    deathRoom: DeathRoomController;
    startLocation: BasePart;
    levelNameText: TextLabel;
    questionText: TextLabel;
    telepads: TeleportController[] = [];

    constructor(level: Level, deathRoom: DeathRoomController) {
        super(level)
        this.deathRoom = deathRoom;

        this.startLocation = level.StartLocation;
        const gui = level.Walls.FrontWall.SurfaceGui;
        this.levelNameText = gui.LevelName;
        this.questionText = gui.Question;

        const telepadsFolder = this.instance.Telepads;
        for (const child of telepadsFolder.GetChildren()) {
            this.telepads.push(new TeleportController(child as TelepadModel)!);
        }
    }

    bindConfig(config: LevelConfig, allLevels: LevelController[]) {
        if (this.questionText) {
            this.questionText.Text = config.question;
        }
        if (this.levelNameText) {
            this.levelNameText.Text = config.name;
        }

        const nextLevel = config.index + 1;
        const correctDestination = ((nextLevel < allLevels.size())
            ? allLevels[nextLevel].startLocation!.CFrame
            : quizWorkspace.Lobby.SpawnLocation.CFrame
        ).add(PLAYER_ROOT_OFFSET);

        for (let i = 0; i < config.answers.size(); i++) {
            if (i < this.telepads.size()) {
                this.telepads[i].setText(config.answers[i]);
                this.telepads[i].setDestination(
                    i === config.correctIndex ? correctDestination : this.deathRoom.randomStartLocation()
                );
            }
        }
    }
}
