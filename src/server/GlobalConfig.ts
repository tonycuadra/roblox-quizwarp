import { PlayerManager } from 'shared/utils/PlayerManager'
import { PlayerController } from './PlayerController';

export const NUM_LEVELS = 5;
export const FIRST_NUMBER = 5;

export const playerManager = new PlayerManager(player => new PlayerController(player, NUM_LEVELS));
