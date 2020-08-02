import { BaseController } from 'shared/BaseController';
import { quizWorkspace, DeathRoom } from 'shared/QuizWarpWorkspace';

export class DeathRoomController extends BaseController<DeathRoom> {

    private startLocations: CFrame[] = [];
    private random = new Random();

    constructor() {
        super(quizWorkspace.DeathRoom);

        const locations = this.instance.StartLocations.GetChildren();
        for (const startLocation of locations) {
            const cframe = (startLocation as BasePart).CFrame; 
            this.startLocations.push(cframe);
        }
    }

    randomStartLocation(): CFrame {
        const index = this.random.NextInteger(0, this.startLocations.size() - 1);
        return this.startLocations[index];
    }

    scream() {
        this.instance.DeathScream.Play();
    }
}
