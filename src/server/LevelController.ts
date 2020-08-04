import { BaseController } from 'shared/BaseController';
import { TeleportController } from './TeleportController';
import { LevelConfig } from 'shared/LevelConfig'
import { DeathRoomController } from './DeathRoomController';
import { quizWorkspace, Lobby } from 'shared/QuizWarpWorkspace';
import { Level } from 'shared/Level';
import { PLAYER_ROOT_OFFSET } from 'shared/PlayerManager';
import { TelepadModel } from 'shared/Telepad';
import { AsyncWait } from 'shared/Async';
import { PlayerController } from './PlayerController';
import { LobbyController } from './LobbyController';
import { quizServerStorage } from 'shared/QuizServerStorage';
import { Workspace } from '@rbxts/services';
import inspect from '@rbxts/inspect';

export class LevelController extends BaseController<Level> {

    deathRoom: DeathRoomController;
    lobby: LobbyController;
    startLocation: BasePart;
    levelNameText: TextLabel;
    questionText: TextLabel;
    telepads: TeleportController[] = [];

    constructor(level: Level, deathRoom: DeathRoomController, lobby: LobbyController) {
        super(level)
        this.deathRoom = deathRoom;
        this.lobby = lobby;

        this.startLocation = level.StartLocation;
        const gui = level.Walls.FrontWall.SurfaceGui;
        this.levelNameText = gui.LevelName;
        this.questionText = gui.Question;

        const telepadsFolder = this.instance.Telepads;
        for (const child of telepadsFolder.GetChildren()) {
            this.telepads.push(new TeleportController(child as TelepadModel)!);
        }
    }

    bindConfig(config: LevelConfig, allLevels: LevelController[], isCheckPoint: boolean) {
        const isLastSublevel = config.sublevelIndex === config.sublevelCount - 1;

        this.questionText.Text = config.question;
        this.levelNameText.Text = config.name;

        const nextLevel = config.overallIndex + 1;
        const lobbyStart = quizWorkspace.Lobby.StartSpawn.CFrame;

        const correctDestination = (
            isLastSublevel ? lobbyStart : allLevels[nextLevel].startLocation!.CFrame
        ).add(PLAYER_ROOT_OFFSET);

        for (let i = 0; i < config.answers.size(); i++) {
            if (i < this.telepads.size()) {
                this.telepads[i].setText(config.answers[i]);
                if (i === config.correct) {
                    this.telepads[i].setDestination(correctDestination);
                    this.telepads[i].setTeleportAction(player =>
                        this.onLevelComplete(player, config)
                    );
                } else {
                    this.telepads[i].setDestination(this.deathRoom.randomStartLocation());
                    this.telepads[i].setTeleportAction(player => this.onTeleportToDeath());
                }
            }
        }

        if (isCheckPoint) {
            const spawnLocations = quizServerStorage.SpawnLocations.GetChildren();
            const spawnLocation = spawnLocations[config.levelIndex].Clone() as SpawnLocation;
            spawnLocation.CFrame = this.startLocation.CFrame;
            spawnLocation.Parent = Workspace;
        }
    }

    onLevelComplete(player: PlayerController, config: LevelConfig) {
        const percent = ((config.sublevelIndex + 1) * 100) / config.sublevelCount;
        const rounded = math.floor(percent + 0.5);

        // Only updated percent completed if player made it further than before
        // const statsValue = player.levelstats[config.levelIndex];
        // const existingValue = tonumber(statsValue.Value.sub(0, -2)) || 0;
        // if (rounded > existingValue) {
        //     statsValue.Value = `${rounded}%`;
        // }

        const isLastSublevel = config.sublevelIndex === config.sublevelCount - 1;
        if (isLastSublevel) {
            this.lobby.onLevelComplete(player.instance, config.levelIndex);
        }
    }

    async onTeleportToDeath() {
        await AsyncWait(0.2);
        this.deathRoom.scream();
    }
}
