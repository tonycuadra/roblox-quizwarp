import { WaitForSignalAsync } from "shared/utils/Async";
import { BaseController } from "shared/utils/BaseController";
import yieldForCharacter, { CharacterRigR15 } from "@rbxts/yield-for-character";

export class PlayerController extends BaseController<Player> {
    lastTeleport: number;
    // levelstats: StringValue[];

    constructor(player: Player, numLevels: number) {
        super(player);

        this.lastTeleport = 0;

        // const leaderstats = newFolder('leaderstats', player);
        // this.levelstats = [];
        // for (let level = 1; level <= numLevels; level++) {
        //     this.levelstats.push(newStringValue(`Level ${level}`, '0%', leaderstats));
        // }

        print(`Created PlayerController: ${this.instance}`);
    }

    tryTeleport(): boolean {
        const now = os.time();
        const deltaTime = now - this.lastTeleport;
        if (deltaTime > 1) {
            this.lastTeleport = now;
            return true;
        }
        return false;
    }

    async getCharacterAsync(): Promise<CharacterRigR15> {
        const player = this.instance;
        if (!player.Character) {
            await WaitForSignalAsync(player.CharacterAdded);
        }
        return await yieldForCharacter(player.Character!)
    }

    async getHumanoidRootPartAsync(): Promise<BasePart> {
        const character = await this.getCharacterAsync();
        return character.FindFirstChild('HumanoidRootPart', true) as BasePart;
    }

    close() {}
}
