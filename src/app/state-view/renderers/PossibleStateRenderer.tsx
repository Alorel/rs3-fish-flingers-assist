import {h, VNode} from 'preact';
import {useAppState} from '../../../state';
import {StateView} from '../index';

export function PossibleStateRenderer(): VNode {
  const [{incompleteLocations}] = useAppState();

  return <StateView state={incompleteLocations} rmAction={'rm:potentialRow'}/>;
}
