import {useContext} from 'preact/hooks';
import {AppStateContext, IStateContext} from '../context';

export function useAppState(): IStateContext {
  return useContext(AppStateContext);
}
