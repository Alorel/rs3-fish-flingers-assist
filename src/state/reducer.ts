import type {Action} from './Action';
import type {AppState} from './AppState';

export function appStateReducer(state: AppState, _action: Action): AppState {
  return state;
}
