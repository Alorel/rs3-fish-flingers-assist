import {h, VNode} from 'preact';
import {memo} from 'preact/compat';
import {useCallback} from 'preact/hooks';
import {btn, btnDanger, btnSm} from '~bootstrap';
import {useAppState} from '../../state';
import type {LocationSpec} from '../../state/LocationSpec';
import {Icon} from '../icon';
import {DistanceTd} from './DistanceTd';
import {HookTd} from './HookTd';

interface Props {
  index: number;

  loc: LocationSpec;

  rmAction: string;
}

function StateViewRow({loc: {location, fish, hook, distance, bait}, rmAction, index}: Props): VNode {
  const [, dispatch] = useAppState();
  const onRmClick = useCallback(() => {
    dispatch({type: rmAction, index});
  },                            [rmAction, index]);

  return (
    <tr>
      <td>{location}</td>
      <td>{fish && <Icon icon={fish}><span>{fish}</span></Icon>}</td>
      <td>{hook && <HookTd hook={hook}/>}</td>
      <td>{distance != null && <DistanceTd distance={distance}/>}</td>
      <td>{bait && <Icon icon={bait}><span>{bait}</span></Icon>}</td>
      <td>
        <button class={`${btn} ${btnDanger} ${btnSm}`}
                onClick={onRmClick}
                type={'button'}>&times;</button>
      </td>
    </tr>
  );
}

const memoed = memo(StateViewRow);

export {memoed as StateViewRow};
