import type {Bait} from '../data/bait';
import type {Fish} from '../data/fish';
import type {FishLocation} from '../data/fishLocation';
import type {Hook} from '../data/hooks';

export interface BaseLocationSpec {
  bait: Bait;

  fish: Fish;

  location: FishLocation;
}

export interface IncompleteLocationSpec extends Partial<BaseLocationSpec> {
  distance?: number | [number, number];

  hook?: Hook | [Hook, Hook];
}

export interface CompleteLocationSpec extends BaseLocationSpec {
  distance: number;

  hook: Hook;
}

export type LocationSpec = IncompleteLocationSpec | CompleteLocationSpec;

function isBaseLocationSpec(v: any): v is (BaseLocationSpec & Obj<any>) {
  return !!(v && v.bait && v.fish && v.location);
}

export function isCompleteLocationSpec(v: any): v is CompleteLocationSpec {
  return isBaseLocationSpec(v) && typeof v.distance === 'number' &&
    !!v.hook && !Array.isArray(v.hook);
}
