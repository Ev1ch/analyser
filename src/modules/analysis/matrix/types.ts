export type Tuple<
  T,
  N extends number,
  R extends T[] = [],
> = R['length'] extends N ? R : Tuple<T, N, [T, ...R]>;

export type Row = number[];

export type Column = Tuple<number, 1>[];
