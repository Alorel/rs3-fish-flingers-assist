import {CompleteLocationSpec} from '../../LocationSpec';

export function hasCompletedTip(locs: CompleteLocationSpec[], tip: Obj<any>): boolean {
  if (!locs.length) {
    return false;
  } else if (tip.bait) {
    return locs.some(l => l.bait === tip.bait);
  } else if (tip.fish) {
    return locs.some(l => l.fish === tip.fish);
  } else if (typeof tip.hook === 'number') {
    return locs.some(l => l.hook === tip.hook);
  } else if (typeof tip.distance === 'number') {
    return locs.some(l => l.distance === tip.disance);
  } else {
    return false;
  }
}
