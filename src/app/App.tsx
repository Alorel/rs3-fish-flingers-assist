import {h, VNode} from 'preact';
import {useReducer} from 'preact/hooks';
import {dFlex, flexColumn, flexGrow1, flexRow, flexShrink0, justifyContentBetween, mt5, p2} from '~bootstrap';
import {AppStateContext, appStateReducer, initialState} from '../state';
import {CurrentStateRenderer, PossibleStateRenderer} from './state-view/renderers';
import {TipDispatcher} from './tip';

export function App(): VNode {
  const appState = useReducer(appStateReducer, initialState);
  if (process.env.NODE_ENV === 'development') {
    console.debug('state:', appState[0]);
  }

  return (
    <AppStateContext.Provider value={appState}>
      <div class={`${dFlex} ${flexColumn} ${p2}`}>
        <h1>Tips</h1>
        <TipDispatcher/>
        <div class={`${mt5} ${dFlex} ${flexRow} ${justifyContentBetween} ${flexGrow1} ${flexShrink0}`}>
          <div>
            <h1>Confirmed fish</h1>
            <CurrentStateRenderer/>
          </div>
          <div>
            <h1>Possible fish</h1>
            <PossibleStateRenderer/>
          </div>
        </div>
      </div>
    </AppStateContext.Provider>
  );
}
