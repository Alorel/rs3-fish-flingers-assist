import type {Action} from './Action';
import {SubmitTipAction} from './action-creators/submitTip';
import {handleConfirmedRowRemoval} from './action-handlers/handleConfirmedRowRemoval';
import {handlePotentialRoleRemoval} from './action-handlers/handlePotentialRowRemoval';
import {handleSubmitTip} from './action-handlers/handleSubmitTip';
import type {AppState} from './AppState';
import {initialState} from './initialState';

export function appStateReducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'tip:submit':
      return handleSubmitTip(state, (action as SubmitTipAction).tip);
    case 'rm:confirmedRow':
      return handleConfirmedRowRemoval(state, action);
    case 'rm:potentialRow':
      return handlePotentialRoleRemoval(state, action);
    case 'newgame':
      return {...initialState};
    default:
      return state;
  }
}
