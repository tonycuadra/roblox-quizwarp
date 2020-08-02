import { GameController } from './GameController';
import { generateMultiplicationQuiz } from './MultiplicationQuizGenerator';
import { LevelConfig } from 'shared/LevelConfig';
import { ServerStorage } from '@rbxts/services';
import { playerManager, NUM_LEVELS, FIRST_NUMBER } from './GlobalConfig';

const refPlayerManager = playerManager;

let gameController: GameController | undefined;

function initGame() {
    const levelModel = ServerStorage.FindFirstChild('Level') as Model;
    gameController = new GameController(levelModel);
    const levels: LevelConfig[] = [];
    const startLevels: number[] = [];

    // Generate multiplication quiz levels
    for (let i = 0; i < NUM_LEVELS; i++) {
        startLevels.push(levels.size());
        generateMultiplicationQuiz(FIRST_NUMBER + i, 1 + i, levels);
    }

    gameController.configure(levels, startLevels);
}

initGame();
