import { BaseController } from 'shared/BaseController';
import { Players } from '@rbxts/services';
import { TelepadModel } from 'shared/Telepad';

export class TeleportController extends BaseController<TelepadModel> {

    private portal: BasePart;
    private textLabel: TextLabel;
    private warpSound: Sound;
    private destination: CFrame;

    constructor(telepad: TelepadModel, text: string = "", destination?: CFrame) {
        super(telepad)

        this.destination = destination || new CFrame();

        this.portal = telepad.Portal;
        this.textLabel = telepad.Portal.SurfaceGui.TextLabel;
        this.warpSound = telepad.TeleportSound;
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

    private onTouch(otherPart: BasePart) {
        const player = Players.GetPlayerFromCharacter(otherPart.Parent);
        if (player !== undefined) {
            this.teleportPlayer(otherPart.Parent!);
        }
    }

    private teleportPlayer(character: Instance) {
        this.warpSound.Play();
        const humanoidRootPart = character.FindFirstChild('HumanoidRootPart', true) as BasePart;
        humanoidRootPart.CFrame = this.destination;
    }
}
