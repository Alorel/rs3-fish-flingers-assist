import {Action} from '../Action';
import {AppState} from '../AppState';
import {handleRowRemoval} from './helpers/handleRowRemoval';

export function handlePotentialRoleRemoval(state: AppState, action: Action): AppState {
  return handleRowRemoval(state, 'incompleteLocations', action);
}
