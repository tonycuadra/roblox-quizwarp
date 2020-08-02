import { BaseController } from 'shared/BaseController';
import { Players } from '@rbxts/services';
import { TelepadModel } from 'shared/Telepad';
import { PlayerController } from './PlayerController';
import { playerManager } from './GlobalConfig';

const ACTION_NO_OP = () => {};
const DEFAULT_PORTAL_COLOR = Color3.fromRGB(4, 175, 236);
const LEVEL_COMPLETE_PORTAL_COLOR = Color3.fromRGB(0, 255, 0);

export type TeleportAction = (player: PlayerController) => void;

export class TeleportController extends BaseController<TelepadModel> {

    private portal: BasePart;
    private textLabel: TextLabel;
    private warpSound: Sound;
    private destination: CFrame;
    private teleportAction: TeleportAction;

    constructor(telepad: TelepadModel, text: string = "", destination?: CFrame) {
        super(telepad)

        this.destination = destination || new CFrame();

        this.portal = telepad.Portal;
        this.textLabel = telepad.Portal.SurfaceGui.TextLabel;
        this.warpSound = telepad.TeleportSound;
        this.teleportAction = ACTION_NO_OP;
        this.addConnection(
            this.portal.Touched.Connect(otherPart => this.onTouch(otherPart))
        );
        this.textLabel.Text = text;
    }

    setText(text: string) {
        this.textLabel.Text = text;
    }

    setDestination(destination: CFrame) {
        this.destination = destination;
    }

    setTeleportAction(action: TeleportAction) {
        this.teleportAction = action;
    }

    clearTeleportAction() {
        this.teleportAction = ACTION_NO_OP;
    }

    setLevelComplete(complete: boolean) {
        this.portal.Color = complete ? LEVEL_COMPLETE_PORTAL_COLOR : DEFAULT_PORTAL_COLOR;
    }

    private onTouch(otherPart: BasePart) {
        const player = Players.GetPlayerFromCharacter(otherPart.Parent);
        if (player !== undefined) {
            const playerController = playerManager.getPlayerController(player);
            if (playerController) {
                this.teleportPlayer(playerController);
            }
        }
    }

    private async teleportPlayer(playerController: PlayerController) {
        if (!playerController.tryTeleport()) {
            return;
        }
        this.warpSound.Play();
        this.teleportAction(playerController);
        const humanoidRootPart = await playerController.getHumanoidRootPartAsync();
        humanoidRootPart.CFrame = this.destination;
    }
}
