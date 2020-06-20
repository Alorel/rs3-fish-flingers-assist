import {h, VNode} from 'preact';
import {memo} from 'preact/compat';
import type {StateViewProps} from './StateViewProps';
import {StateViewRow} from './StateViewRow';

function StateViewTbody({state}: StateViewProps): VNode {
  return (
    <tbody>{state.map(loc => <StateViewRow loc={loc} key={JSON.stringify(loc)}/>)}</tbody>
  );
}

const memoed = memo(StateViewTbody);

export {memoed as StateViewTbody};
