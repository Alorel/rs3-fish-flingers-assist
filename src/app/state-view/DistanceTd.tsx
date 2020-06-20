import {Fragment, h, VNode} from 'preact';

export function DistanceTd({distance}: { distance: number | [number, number] }): VNode {
  return <Fragment>{Array.isArray(distance) ? `${distance[0]} - ${distance[1]}` : distance}</Fragment>;
}
