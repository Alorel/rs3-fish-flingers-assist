import {Bait} from '../data/bait';
import {Fish} from '../data/fish';
import {Hook} from '../data/hooks';
import type {CompleteLocationSpec, IncompleteLocationSpec} from './LocationSpec';

export interface AppState {
  availableBait: Bait[];

  completeLocations: CompleteLocationSpec[];

  availableDistance: number[];

  availableFish: Fish[];

  availableHooks: Hook[];

  incompleteLocations: IncompleteLocationSpec[];
}
