import { GameController } from './GameController';
import { generateMultiplicationQuiz } from './MultiplicationQuizGenerator';
import { LevelConfig } from 'shared/LevelConfig';
import { playerManager, NUM_LEVELS, FIRST_NUMBER } from './GlobalConfig';
import inspect from '@rbxts/inspect';

const refPlayerManager = playerManager;

let gameController: GameController | undefined;

function initGame() {
    gameController = new GameController();
    const levels: LevelConfig[] = [];
    const startLevels: number[] = [];
    const checkpointLevels: number[] = [];

    // Generate multiplication quiz levels
    for (let i = 0; i < NUM_LEVELS; i++) {
        const startLevel = levels.size();
        generateMultiplicationQuiz(FIRST_NUMBER + i, 1 + i, levels);
        const checkpointLevel = startLevel + math.floor((levels.size() - startLevel) / 2);

        startLevels.push(startLevel);
        checkpointLevels.push(checkpointLevel);
    }

    gameController.configure(levels, startLevels, checkpointLevels);
}

initGame();
