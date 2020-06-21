export function withoutIndex<T>(arr: T[], index: number): T[] {
  const newArr = arr.slice(0);
  newArr.splice(index, 1);

  return newArr;
}
