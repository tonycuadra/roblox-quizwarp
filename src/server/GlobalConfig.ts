import { PlayerManager } from 'shared/PlayerManager'
import { PlayerController } from './PlayerController';

export const NUM_LEVELS = 5;

export const playerManager = new PlayerManager(player => new PlayerController(player, NUM_LEVELS));
