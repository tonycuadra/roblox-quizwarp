// import { Players } from '@rbxts/services';
import { Closeable } from './Closeable';
import { Players } from '@rbxts/services';

export const PLAYER_ROOT_OFFSET = new Vector3(0, 3.5, 0);

// Helper class for instantiating a controller instance for each player.
// It will wait until the corresponding character model is also available.
// The controller instance will be closed when the player is removed.
export class PlayerManager<T extends Closeable> {

    private controllerMap: Map<Player, T> = new Map();
    private controllerFactory: (player: Player, character: Model) => T;

    constructor(controllerFactory: (player: Player, character: Model) => T) {
        this.controllerFactory = controllerFactory;

        print('Creating PlayerManager');

        Players.PlayerAdded.Connect(player => this.onAdded(player));
        Players.PlayerRemoving.Connect(player => this.onRemoved(player));

        for (const player of Players.GetPlayers()) {
            this.onAdded(player);
        }
    }

    getPlayerController(player: Player): T | undefined {
        return this.controllerMap.get(player);
    }

    getPlayerControllers(): T[] {
        return this.controllerMap.values();
    }

    private onAdded(player: Player) {
        player.CharacterAdded.Connect(character => {
            this.onPlayerAdded(player, character);
        })
        if (player.Character) {
            this.onPlayerAdded(player, player.Character);
        }
    }

    private onRemoved(player: Player) {
        const controller = this.controllerMap.get(player);
        this.controllerMap.delete(player);
        if (controller !== undefined) {
            controller.close();
        }
    }

    private onPlayerAdded(player: Player, character: Model) {
        const controller = this.controllerFactory(player, character);
        this.controllerMap.set(player, controller);
    }
}