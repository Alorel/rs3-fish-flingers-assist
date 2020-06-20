import {noop} from 'lodash';
import {createContext} from 'preact';
import type {Action} from './Action';
import type {AppState} from './AppState';
import {initialState} from './initialState';

export type IStateContext = [AppState, (a: Action) => void];

export const AppStateContext = createContext<IStateContext>([initialState, noop]);
