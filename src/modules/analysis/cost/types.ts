import { Matrix } from 'modules/analysis';

export type HypothesisFunction<T extends number | Matrix = number> = (
  Theta: Matrix,
  X: Matrix,
) => T;
