import { Closeable } from "shared/Closeable";
import { newFolder, newIntValue } from "shared/NewInstance";
import { PlayerManager } from "shared/PlayerManager";
import { BaseController } from "shared/BaseController";

export class PlayerController extends BaseController<Player> {
    character: Model;
    humanoidRootPart: BasePart;

    lastTeleport: number;

    constructor(player: Player, character: Model) {
        super(player);
        this.character = character;
        this.humanoidRootPart = character.FindFirstChild('HumanoidRootPart', true) as BasePart;

        this.lastTeleport = 0;

        // const leaderstats = newFolder('leaderstats', this.player);
        // this.strength = newIntValue('Strength', 0, leaderstats);
        // this.rebirths = newIntValue('Rebirths', 0, leaderstats);

        // const vars = newFolder('PlayerVars', this.player);
        // this.chops = newIntValue('TreeChops', 0, vars);
        // this.payout = newIntValue('WoodPayout', 1, vars);

        print(`Created PlayerController: ${this.instance}, ${this.character}`);
    }

    tryTeleport(): boolean {
        const now = os.time();
        const deltaTime = now - this.lastTeleport;
        if (deltaTime > 1) {
            print(`tryTeleport: true, deltaTime: ${deltaTime}`)
            this.lastTeleport = now;
            return true;
        }
        print(`tryTeleport: false, deltaTime: ${deltaTime}`)
        return false;
    }

    close() {}
}

export const playerManager = new PlayerManager(
    (player: Player, character: Model) => new PlayerController(player, character)
);
