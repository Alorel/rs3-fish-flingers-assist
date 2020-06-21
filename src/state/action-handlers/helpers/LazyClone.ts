const _cloned: unique symbol = Symbol('cloned');

export class LazyClone<T extends object> {
  private [_cloned]: T;

  public constructor(public readonly initial: T) {
  }

  public get cloned(): T {
    const value = this[_cloned] = {...this.initial};
    Object.defineProperty(this, 'cloned', {value});

    return value;
  }

  public get final(): T {
    return this[_cloned] || this.initial;
  }
}
