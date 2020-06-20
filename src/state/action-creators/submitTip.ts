import {Action} from '../Action';

export interface SubmitTipAction extends Action {
  tip: { [k: string]: any };
}

export function submitTip(tip: { [k: string]: any }): SubmitTipAction {
  return {type: 'tip:submit', tip};
}
