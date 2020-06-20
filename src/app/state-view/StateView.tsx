import {h, VNode} from 'preact';
import {table as cssTable, tableBordered} from '~bootstrap';
import {StateViewEmptyInfobox} from './StateViewEmptyInfobox';
import {StateViewProps} from './StateViewProps';
import {StateViewTbody} from './StateViewTbody';

export function StateView({state}: StateViewProps): VNode {
  if (!state.length) {
    return <StateViewEmptyInfobox/>;
  }

  return (
    <table class={`${cssTable} ${tableBordered}`}>
      <thead>
      <tr>
        <th>Location</th>
        <th>Fish</th>
        <th>Hook</th>
        <th>Distance</th>
        <th>Bait</th>
      </tr>
      </thead>
      <StateViewTbody state={state}/>
    </table>
  );
}
