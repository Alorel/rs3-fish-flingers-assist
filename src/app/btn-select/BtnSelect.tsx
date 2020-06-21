import {identity} from 'lodash';
import {ComponentChildren, h, VNode} from 'preact';
import {memo} from 'preact/compat';
import {useCallback} from 'preact/hooks';
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

  return (
    <div class={`${justifyContentCenter} ${dInlineFlex} ${flexWrap}`}>{
      options.map((option, idx): ComponentChildren => {
        const toggleFn = () => {
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
            onChange((value === option ? null : option) as any);
          }
        };

        return <BtnSelectButton toggle={toggleFn}
                                key={`btn-select-opt-${option}-${idx}`}
                                active={isActive(option)}>{render!(option)}</BtnSelectButton>;
      })
    }</div>
  );
}

function BtnSelect<T>(props: IBtnSelect<T>): VNode | null {
  return props.options.length ? <BtnSelectInner {...props}/> : null;
}

BtnSelect.defaultProps = {render: identity, multi: false};
const memoed = memo(BtnSelect);

export {memoed as BtnSelect};
