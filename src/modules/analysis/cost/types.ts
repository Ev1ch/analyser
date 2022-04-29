import Matrix from 'modules/analysis/matrix';

export type HypothesisFunction<T extends number | Matrix = number> = (
  Theta: Matrix,
  X: Matrix,
) => T;
