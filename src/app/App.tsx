import {h, VNode} from 'preact';
import {AppStateWrapper} from '../state';
import {CurrentStateRenderer} from './state-view/renderers';

export function App(): VNode {
  return (
    <AppStateWrapper>
      <CurrentStateRenderer/>
    </AppStateWrapper>
  );
}
