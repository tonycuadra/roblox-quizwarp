import { GameController } from './GameController';
import { generateMultiplicationQuiz } from './MultiplicationQuizGenerator';
import { LevelConfig } from 'shared/LevelConfig';
import { ServerStorage } from '@rbxts/services';

let gameController: GameController | undefined;

function initGame() {
    const levelModel = ServerStorage.FindFirstChild('Level') as Model;
    gameController = new GameController(levelModel);
    const levels: LevelConfig[] = [];
    const startLevels: number[] = [];

    // Generate 5 levels of multiplication quiz
    for (let i = 0; i < 5; i++) {
        const subLevels = generateMultiplicationQuiz(4 + i, 1 + i);
        startLevels.push(levels.size());
        levels.push(...subLevels);
    }

    gameController.configure(levels, startLevels);
}

initGame();
