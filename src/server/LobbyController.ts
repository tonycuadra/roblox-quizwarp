import { BaseController } from 'shared/BaseController';
import { TeleportController } from './TeleportController';
import { LevelController } from './LevelController';
import { quizWorkspace, Lobby } from 'shared/QuizWarpWorkspace';
import { TelepadModel } from 'shared/Telepad';

export class LobbyController extends BaseController<Lobby> {

    teleportControllers: TeleportController[] = [];

    constructor() {
        super(quizWorkspace.Lobby)
    }

    init(startLevels: LevelController[]) {
        const telepads = this.instance.Telepads.GetChildren();
        if (telepads.size() !== startLevels.size()) {
            throw `ERROR: Lobby telepads size ${telepads.size()} !== start levels size ${startLevels.size()}`;
        }
        for (let i = 0; i < telepads.size(); i++) {
            const telepad = telepads[i] as TelepadModel;
            const level = startLevels[i];
            const destination = level.startLocation!.CFrame;
            const teleportController = new TeleportController(
                telepad, level.levelNameText.Text.slice(6, 7), destination);
            this.teleportControllers.push(teleportController);
        }
    }
}
