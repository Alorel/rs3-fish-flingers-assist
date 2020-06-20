import {Action} from '../../Action';
import {AppState} from '../../AppState';
import {withoutIndex} from './withoutIndex';

export function handleRowRemoval(state: AppState, key: keyof AppState, action: Action): AppState {
  return {
    ...state,
    [key]: withoutIndex<any>(state[key], action.index)
  };
}
