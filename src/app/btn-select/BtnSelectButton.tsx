import {ComponentChildren, h, VNode} from 'preact';
import {useCallback} from 'preact/hooks';
import {btn, btnLight, btnSuccess, flexGrow1, flexShrink1, m1} from '~bootstrap';

interface Props {
  active: boolean;

  children: ComponentChildren;

  toggle(): void;
}

export function BtnSelectButton({active, toggle, children}: Props): VNode {
  const onClick = useCallback(() => {
    toggle();
  }, [toggle]);

  return <button type={'button'}
                 class={`${btn} ${m1} ${flexGrow1} ${flexShrink1} ${active ? btnSuccess : btnLight}`}
                 onClick={onClick}>{children}</button>;

}
