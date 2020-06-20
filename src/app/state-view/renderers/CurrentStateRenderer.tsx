import {h, VNode} from 'preact';
import {useAppState} from '../../../state';
import {StateView} from '../index';

export function CurrentStateRenderer(): VNode {
  const [{completeLocations}] = useAppState();

  return <StateView state={completeLocations}/>;
}
