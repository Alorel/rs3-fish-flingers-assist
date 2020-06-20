import {staticComponent} from '@alorel/preact-static-component';
import {h, VNode} from 'preact';
import {alert, alertInfo, textCenter} from '~bootstrap';

function StateViewEmptyInfobox(): VNode {
  return <div role={'alert'} class={`${alert} ${alertInfo} ${textCenter}`}>No state to display</div>;
}

const wrapped = staticComponent(StateViewEmptyInfobox);

export {wrapped as StateViewEmptyInfobox};
