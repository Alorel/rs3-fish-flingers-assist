import {Fragment, h, VNode} from 'preact';
import {ml3, mr1} from '~bootstrap';
import {Hook} from '../../data/hooks';
import {Icon} from '../icon';

export function HookTd({hook}: { hook: Hook | [Hook, Hook] }): VNode | null {
  if (!hook) {
    return null;
  } else if (Array.isArray(hook)) {
    return (
      <Fragment>
        <Icon icon={hook[0]}>
          <span>{hook[0]}</span>
        </Icon>
        <span class={`${ml3} ${mr1}`}>/</span>
        <Icon icon={hook[1]}>
          <span>{hook[1]}</span>
        </Icon>
      </Fragment>
    );
  } else {
    return (
      <Icon icon={hook}>
        <span>{hook}</span>
      </Icon>
    );
  }
}
