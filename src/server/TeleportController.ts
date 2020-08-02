import { BaseController } from 'shared/BaseController';
import { Players } from '@rbxts/services';
import { TelepadModel } from 'shared/Telepad';
import { playerManager, PlayerController } from './PlayerController';

const ACTION_NO_OP = () => {};

export class TeleportController extends BaseController<TelepadModel> {

    private portal: BasePart;
    private textLabel: TextLabel;
    private warpSound: Sound;
    private destination: CFrame;
    private teleportAction: () => void;

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

    setTeleportAction(action: () => void) {
        this.teleportAction = action;
    }

    clearTeleportAction() {
        this.teleportAction = ACTION_NO_OP;
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

    private teleportPlayer(playerController: PlayerController) {
        if (!playerController.tryTeleport()) {
            return;
        }
        this.warpSound.Play();
        this.teleportAction();
        playerController.humanoidRootPart.CFrame = this.destination;
    }
}
