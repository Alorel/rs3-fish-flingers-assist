import {ComponentChildren, h, VNode} from 'preact';
import {useReducer} from 'preact/hooks';
import {AppStateContext} from './context';
import {initialState} from './initialState';
import {appStateReducer} from './reducer';

export function AppStateWrapper({children}: { children: ComponentChildren }): VNode {
  const value = useReducer(appStateReducer, initialState);

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>;
}
