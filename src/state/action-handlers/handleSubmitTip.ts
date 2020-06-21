import {isEmpty} from 'lodash';
import {AppState} from '../AppState';
import {adjustAvailables} from './helpers/adjustAvailables';
import {adjustOptionalDistanceAndHook} from './helpers/adjustOptionalDistanceAndHook';
import {assignTipToCorrectArray} from './helpers/assignTipToCorrectArray';
import {hasCompletedTip} from './helpers/hasCompletedTip';
import {sortLocations} from './helpers/sortLocations';

export function handleSubmitTip(state: AppState, tip: Obj<any>): AppState {
  if (isEmpty(tip) || hasCompletedTip(state.completeLocations, tip)) {
    return state;
  }

  let out = assignTipToCorrectArray(state, tip);
  if (out !== state) {
    out = adjustOptionalDistanceAndHook(out, tip);
    out = adjustAvailables(out);

    // sort
    for (const k of ['completeLocations', 'incompleteLocations'] as ['completeLocations', 'incompleteLocations']) {
      if (out[k] !== state[k]) {
        out[k] = sortLocations<any>(out[k]);
      }
    }
  }

  return out;
}
