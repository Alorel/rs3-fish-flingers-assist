import {ComponentChildren, Fragment, h, VNode} from 'preact';
import {mr1} from '~bootstrap';
import * as icons from './icons';
import {iconCss} from './style.scss';

interface Props {
  children?: ComponentChildren;

  icon: string;
}

export function Icon({icon, children}: Props): VNode | null {
  const url = (icons as any)[icon];
  if (!url) {
    return null;
  }

  if (children) {
    return (
      <Fragment>
        <img alt={icon} class={`${iconCss} ${mr1}`} src={url}/>
        {children}
      </Fragment>
    );
  }

  return <img alt={icon} class={iconCss} src={url}/>;
}
