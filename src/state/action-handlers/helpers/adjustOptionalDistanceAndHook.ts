import {AppState} from '../../AppState';
import {isCompleteLocationSpec, LocationSpec} from '../../LocationSpec';

function overwriteWithExact<T>(multi: [T, T], emergedValue: T): T {
  return emergedValue === multi[0] ? multi[1] : multi[0];
}

function tweak(state: AppState, tip: Obj<any>, prop: string): AppState {
  const {incompleteLocations, completeLocations} = state;

  const idx = incompleteLocations
    .findIndex((l: any) => Array.isArray(l[prop]) && l[prop].includes(tip[prop]));

  if (idx !== -1) {
    const newLoc: LocationSpec & Obj<any> = {...incompleteLocations[idx]};
    newLoc[prop as any] = overwriteWithExact<any>(newLoc[prop], tip[prop]);

    const newIncompleteLocs = incompleteLocations.slice();

    if (isCompleteLocationSpec(newLoc)) {
      newIncompleteLocs.splice(idx, 1);

      return {
        ...state,
        completeLocations: completeLocations.concat(newLoc),
        incompleteLocations: newIncompleteLocs
      };
    } else {
      newIncompleteLocs[idx] = newLoc;

      return {
        ...state,
        incompleteLocations: newIncompleteLocs
      };
    }
  }

  return state;
}

/** Adjust the tables if, e.g. something had distance 2-3 and we received a tip with distance 3 */
export function adjustOptionalDistanceAndHook(state: AppState, tip: Obj<any>): AppState {
  const {incompleteLocations} = state;
  if (!incompleteLocations.length) {
    return state;
  }

  if (typeof tip.distance === 'number') {
    state = tweak(state, tip, 'distance');
  }
  if (tip.hook && !Array.isArray(tip.hook)) {
    state = tweak(state, tip, 'hook');
  }

  return state;
}
