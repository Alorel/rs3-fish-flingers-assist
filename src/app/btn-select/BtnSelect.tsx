import {identity} from 'lodash';
import {ComponentChildren, h, VNode} from 'preact';
import {memo} from 'preact/compat';
import {useCallback, useRef} from 'preact/hooks';
import {dInlineFlex, flexWrap, justifyContentCenter} from '~bootstrap';
import {withoutIndex} from '../../state/action-handlers/helpers/withoutIndex';
import {BtnSelectButton} from './BtnSelectButton';

interface IBtnSelectBase<T> {
  options: T[];

  render?(option: T): ComponentChildren;
}

interface IBtnSelectSingle<T> extends IBtnSelectBase<T> {
  multi?: false;

  value: T | null;

  onChange(newValue: T | null): void;
}

interface IBtnSelectMulti<T> extends IBtnSelectBase<T> {
  multi: true;

  value: T[];

  onChange(newValue: T[]): void;
}

export type IBtnSelect<T> = IBtnSelectSingle<T> | IBtnSelectMulti<T>;

function BtnSelectInner<T>({options, value, onChange, multi, render}: IBtnSelect<T>): VNode {
  const isActive = useCallback((option: T): boolean => {
    if (multi) {
      return (value as T[]).includes(option);
    } else {
      return value === option;
    }
  }, [value, multi]);
  const ref = useRef<HTMLDivElement>();
  const processOption = useCallback((option: any) => {
    if (multi) {
      const currIdx = (value as T[]).indexOf(option);
      if (currIdx === -1) {
        switch ((value as T[]).length) {
          case 0:
            onChange([option] as any);
            break;
          case 1:
            onChange((value as T[]).concat(option) as any);
            break;
          default:
            onChange([(value as T[])[1], option] as any);
        }
      } else {
        onChange(withoutIndex(value as T[], currIdx) as any);
      }
    } else {
      onChange((value === option ? null : option));
    }
  }, [multi, onChange, value]);
  const onContainerClick = useCallback((e: Event): void => {
    let target: HTMLElement = e.target as HTMLElement;
    do {
      const option: any = target.getAttribute('data-option');
      if (option) {
        processOption(JSON.parse(option));
        break;
      } else {
        target = target.parentElement!;
      }
    } while (target && target !== ref.current);
  }, [processOption, ref.current]);

  return (
    <div ref={ref} onClick={onContainerClick} class={`${justifyContentCenter} ${dInlineFlex} ${flexWrap}`}>{
      options.map(option => (
        <BtnSelectButton option={option}
                         key={option}
                         active={isActive(option)}>{render!(option)}</BtnSelectButton>
      ))
    }</div>
  );
}

function BtnSelect<T>(props: IBtnSelect<T>): VNode | null {
  return props.options.length ? <BtnSelectInner {...props}/> : null;
}

BtnSelect.defaultProps = {render: identity, multi: false};
const memoed = memo(BtnSelect);

export {memoed as BtnSelect};
