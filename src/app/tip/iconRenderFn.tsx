import {h, VNode} from 'preact';
import {Icon} from '../icon';

export function iconRenderFn(icon: string): VNode {
  return <Icon icon={icon}><span>{icon}</span></Icon>;
}
