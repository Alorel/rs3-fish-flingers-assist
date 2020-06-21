import {AppState} from '../../AppState';
import {isCompleteLocationSpec, LocationSpec} from '../../LocationSpec';
import {findTipInIncompleteLocs} from './findTipInIncompleteLocs';

export function assignTipToCorrectArray(state: AppState, tip: Obj<any>): AppState {
  const {incompleteLocations, completeLocations} = state;

  if (isCompleteLocationSpec(tip)) {
    return {
      ...state,
      completeLocations: completeLocations.concat({...tip})
    };
  }

  const existingTipIdx = findTipInIncompleteLocs(incompleteLocations, tip);
  if (existingTipIdx === -1) {
    return {
      ...state,
      incompleteLocations: incompleteLocations.concat({...tip})
    };
  }

  const newLoc: LocationSpec = {
    ...incompleteLocations[existingTipIdx],
    ...tip
  };
  const newIncompleteLocs = incompleteLocations.slice();
  if (isCompleteLocationSpec(newLoc)) {
    newIncompleteLocs.splice(existingTipIdx, 1);

    return {
      ...state,
      completeLocations: completeLocations.concat(newLoc),
      incompleteLocations: newIncompleteLocs
    };
  } else {
    newIncompleteLocs[existingTipIdx] = newLoc;

    return {
      ...state,
      incompleteLocations: newIncompleteLocs
    };
  }
}
