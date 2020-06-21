import {existsOnBoth} from '../../../app/util/existsOnBoth';
import {IncompleteLocationSpec, LocationSpec} from '../../LocationSpec';

export function findTipInIncompleteLocs(locs: IncompleteLocationSpec[], tip: Obj<any>): number {
  if (!locs.length) {
    return -1;
  }

  const immediateChecks: (keyof LocationSpec)[] = ['bait', 'fish', 'hook', 'distance'];

  outer:
    for (let i = 0; i < locs.length; i++) {
      const loc = locs[i];

      for (const prop of immediateChecks) {
        if (existsOnBoth(loc, tip, prop)) {
          if (loc[prop] === tip[prop]) {
            return i;
          } else {
            continue outer;
          }
        }
      }

    }

  return -1;
}
