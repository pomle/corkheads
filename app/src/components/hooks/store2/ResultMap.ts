export class ResultMap<T> extends Map<string, T> {
  map<R>(fn: (result: T, index: number) => R): R[] {
    let i = 0;
    return Array.from(this).map(([, value]) => fn(value, i++));
  }
}
