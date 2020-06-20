import type {CompleteLocationSpec, LocationSpec} from './LocationSpec';

export interface AppState {
  completeLocations: CompleteLocationSpec[];

  locations: LocationSpec[];
}
