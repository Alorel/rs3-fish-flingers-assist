import {ComponentChildren, h, VNode} from 'preact';
import {memo} from 'preact/compat';
import {card, cardBody, cardHeader, flexGrow1, flexShrink1, m2, textCenter, textNowrap} from '~bootstrap';
import {BtnSelect, IBtnSelect} from '../btn-select/BtnSelect';

export interface ITipRow<T> {
  children: ComponentChildren;

  get: T;

  multi?: boolean;

  options: any[];

  render?: IBtnSelect<any>['render'];

  set(v: T): void;
}

function TipCard<T>({children, get, options, set, multi, render}: ITipRow<T>): VNode {
  const containerClass: string = [
    card,
    m2,
    flexGrow1,
    flexShrink1
  ].join(' ');

  return (
    <div class={containerClass}>
      <h5 class={`${cardHeader} ${textNowrap}`}>{children}</h5>
      <div class={`${cardBody} ${textCenter}`}>
        <BtnSelect options={options}
                   onChange={set}
                   value={get}
                   multi={multi as any}
                   render={render}/>
      </div>
    </div>
  );
}

const memoed = memo(TipCard);

export {memoed as TipCard};
