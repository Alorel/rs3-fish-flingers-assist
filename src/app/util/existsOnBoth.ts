export function existsOnBoth<T extends object>(obj1: T, obj2: Obj<any>, prop: keyof T): boolean {
  return !!(obj1[prop] && obj2[prop as any]);
}
