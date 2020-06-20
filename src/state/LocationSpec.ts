import type {Bait} from '../data/bait';
import type {Fish} from '../data/fish';
import type {FishLocation} from '../data/fishLocation';
import type {Hook} from '../data/hooks';

interface BaseLocationSpec {
  bait: Bait;

  fish: Fish;

  location: FishLocation;
}

export interface IncompleteLocationSpec extends Partial<BaseLocationSpec> {
  complete: false;

  distance?: number | [number, number];

  hook?: Hook | [Hook, Hook];
}

export interface CompleteLocationSpec extends BaseLocationSpec {
  complete: true;

  distance: number;

  hook: Hook;
}

export type LocationSpec = IncompleteLocationSpec | CompleteLocationSpec;
