declare module '*.scss';
declare module '~bootstrap';
declare module '*.png' {
  var url: string;

  export default url;
}

interface Obj<T> {
  [k: string]: T;
}
