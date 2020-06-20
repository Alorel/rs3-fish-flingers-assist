import {h, VNode} from 'preact';
import {memo} from 'preact/compat';
import type {LocationSpec} from '../../state/LocationSpec';
import {Icon} from '../icon';
import {DistanceTd} from './DistanceTd';
import {HookTd} from './HookTd';

function StateViewRow({loc: {location, fish, hook, distance, bait}}: { loc: LocationSpec }): VNode {
  return (
    <tr>
      <td>{location}</td>
      <td>{fish && <Icon icon={fish}><span>{fish}</span></Icon>}</td>
      <td>{hook && <HookTd hook={hook}/>}</td>
      <td>{distance != null && <DistanceTd distance={distance}/>}</td>
      <td>{bait && <Icon icon={bait}><span>{bait}</span></Icon>}</td>
    </tr>
  );
}

const memoed = memo(StateViewRow);

export {memoed as StateViewRow};
