import {isEqual, without} from 'lodash';
import {Bait, BAIT_LIST} from '../../../data/bait';
import {DISTANCE_LIST} from '../../../data/distance';
import {Fish, FISH_LIST} from '../../../data/fish';
import {Hook, HOOK_LIST} from '../../../data/hooks';
import {AppState} from '../../AppState';
import {LazyClone} from './LazyClone';

function applyDiff<T extends keyof AppState>(state: LazyClone<AppState>, prop: T, value: AppState[T]): void {
  if (!isEqual(state.initial[prop], value)) {
    state.cloned[prop] = value;
  }
}

export function adjustAvailables(state: AppState): AppState {
  const {completeLocations} = state;

  const baitInUse: Bait[] = [];
  const distanceInUse: number[] = [];
  const fishInUse: Fish[] = [];
  const hooksInUse: Hook[] = [];
  for (let i = 0; i < completeLocations.length; i++) {
    baitInUse[i] = completeLocations[i].bait;
    distanceInUse[i] = completeLocations[i].distance;
    fishInUse[i] = completeLocations[i].fish;
    hooksInUse[i] = completeLocations[i].hook;
  }

  const out = new LazyClone(state);
  applyDiff(out, 'availableBait', without(BAIT_LIST, ...baitInUse));
  applyDiff(out, 'availableDistance', without(DISTANCE_LIST, ...distanceInUse));
  applyDiff(out, 'availableFish', without(FISH_LIST, ...fishInUse));
  applyDiff(out, 'availableHooks', without(HOOK_LIST, ...hooksInUse));

  return out.final;
}
