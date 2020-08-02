import { BaseController } from 'shared/BaseController';
import { quizWorkspace, Lobby } from 'shared/QuizWarpWorkspace';
import { TelepadModel } from 'shared/Telepad';
import { AsyncChildOf } from 'shared/Async';

const LEVEL_COMPLETE_PORTAL_COLOR = Color3.fromRGB(0, 255, 0);

export class ClientLobbyController extends BaseController<Lobby> {

    constructor() {
        super(quizWorkspace.Lobby)
        this.initAsync();
    }

    async initAsync() {
        await AsyncChildOf(this.instance, 'LevelCompleteEvent');
        this.addConnection(
            this.instance.LevelCompleteEvent.OnClientEvent.Connect(
                (levelIndex: number) => this.onLevelComplete(levelIndex)
            )
        );
    }

    onLevelComplete(levelIndex: number) {
        const telepads = this.instance.Telepads.GetChildren();

        if (levelIndex >= telepads.size()) {
            print(`ERROR: onLevelComplete(${levelIndex}) -- invalid index, ` + 
                  `telepads.size() = ${telepads.size()}`)
            return;
        }

        const telepad = telepads[levelIndex] as TelepadModel;
        telepad.Portal.Color = LEVEL_COMPLETE_PORTAL_COLOR;
    }
}
