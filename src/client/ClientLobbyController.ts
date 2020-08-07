import { BaseController } from 'shared/BaseController';
import { quizWorkspace } from 'shared/types/QuizWorkspace';
import { Telepad } from 'shared/types/Level';
import { yieldForTree } from '@rbxts/validate-tree';
import { Lobby } from 'shared/types/Lobby';
import { AsyncController } from 'shared/AsyncController';

const LEVEL_COMPLETE_PORTAL_COLOR = Color3.fromRGB(0, 255, 0);

export class ClientLobbyController extends AsyncController<Lobby> {

    constructor() {
        super(quizWorkspace.Lobby, Lobby)
    }

    onFullTreeReady() {
        this.addConnection(
            this.instance.LevelCompleteEvent.OnClientEvent.Connect(
                (levelIndex: number) => this.onLevelComplete(levelIndex)
            )
        );
    }

    async onLevelComplete(levelIndex: number) {
        const telepads = this.instance.Telepads.GetChildren();

        if (levelIndex >= telepads.size()) {
            print(`ERROR: onLevelComplete(${levelIndex}) -- invalid index, ` + 
                  `telepads.size() = ${telepads.size()}`)
            return;
        }

        const telepad = telepads[levelIndex] as Telepad;
        await yieldForTree(telepad, Telepad);
        telepad.Portal.Color = LEVEL_COMPLETE_PORTAL_COLOR;
    }
}
