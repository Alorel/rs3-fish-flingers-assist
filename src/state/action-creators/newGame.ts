import type {Action} from '../Action';

export function newGame(): Action {
  return {type: 'newgame'};
}
