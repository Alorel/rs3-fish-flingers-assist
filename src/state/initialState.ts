import {BAIT_LIST} from '../data/bait';
import {DISTANCE_LIST} from '../data/distance';
import {FISH_LIST} from '../data/fish';
import {HOOK_LIST} from '../data/hooks';
import type {AppState} from './AppState';

export const initialState: AppState = {
  availableBait: BAIT_LIST,
  availableDistance: DISTANCE_LIST,
  availableFish: FISH_LIST,
  availableHooks: HOOK_LIST,
  completeLocations: [],
  incompleteLocations: []
};
