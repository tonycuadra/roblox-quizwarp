import { BaseController } from 'shared/utils/BaseController';
import { TeleportController } from './TeleportController';
import { LevelController } from './LevelController';
import { Telepad } from 'shared/types/Level';
import { Lobby } from 'shared/types/Lobby';
import { quizWorkspace } from 'shared/types/QuizWorkspace';
import { PLAYER_ROOT_OFFSET } from 'shared/utils/PlayerManager';

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
            const telepad = telepads[i] as Telepad;
            const level = startLevels[i];
            const destination = level.startLocation!.CFrame.add(PLAYER_ROOT_OFFSET);
            const teleportController = new TeleportController(
                telepad, level.levelNameText.Text.slice(6, 7), destination);
            this.teleportControllers.push(teleportController);
        }
    }

    onLevelComplete(player: Player, levelIndex: number) {
        quizWorkspace.Lobby.LevelCompleteEvent.FireClient(player, levelIndex);
    }
}
