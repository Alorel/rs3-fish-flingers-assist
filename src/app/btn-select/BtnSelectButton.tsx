import {ComponentChildren, h, VNode} from 'preact';
import {btn, btnLight, btnSuccess, flexGrow1, flexShrink1, m1} from '~bootstrap';

interface Props<T> {
  active: boolean;

  children: ComponentChildren;

  option: T;
}

export function BtnSelectButton<T>({active, children, option}: Props<T>): VNode {
  return <button type={'button'}
                 data-option={JSON.stringify(option)}
                 class={`${btn} ${m1} ${flexGrow1} ${flexShrink1} ${active ? btnSuccess : btnLight}`}
  >{children}</button>;
}
