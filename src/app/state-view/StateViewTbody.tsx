import {h, VNode} from 'preact';
import {memo} from 'preact/compat';
import type {StateViewProps} from './StateViewProps';
import {StateViewRow} from './StateViewRow';

function StateViewTbody({state, rmAction}: StateViewProps): VNode {
  return (
    <tbody>{state.map((loc, index) => (
      <StateViewRow rmAction={rmAction}
                    index={index}
                    loc={loc}
                    key={JSON.stringify(loc)}/>
    ))}</tbody>
  );
}

const memoed = memo(StateViewTbody);

export {memoed as StateViewTbody};
