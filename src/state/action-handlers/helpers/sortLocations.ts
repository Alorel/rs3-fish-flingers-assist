import {sortBy} from 'lodash';
import {LOCATION_LIST} from '../../../data/fishLocation';
import {LocationSpec} from '../../LocationSpec';

function locationIteratee<T extends LocationSpec>({location}: T): number | null {
  return location ? LOCATION_LIST.indexOf(location) : null;
}

export function sortLocations<T extends LocationSpec>(locs: T[]): T[] {
  return sortBy<T>(locs, [
    locationIteratee,
    'fish',
    'bait',
    'hook',
    'distance'
  ]);
}
