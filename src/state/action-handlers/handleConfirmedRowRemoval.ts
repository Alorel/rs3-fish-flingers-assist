import {Action} from '../Action';
import {AppState} from '../AppState';
import {adjustAvailables} from './helpers/adjustAvailables';
import {handleRowRemoval} from './helpers/handleRowRemoval';

export function handleConfirmedRowRemoval(state: AppState, action: Action): AppState {
  const removed = handleRowRemoval(state, 'completeLocations', action);

  return adjustAvailables(removed);
}
