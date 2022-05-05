import Matrix from 'modules/analysis/matrix';
import { HypothesisFunction } from './types';

abstract class Cost {
  public abstract calculate(
    Theta: Matrix,
    X: Matrix,
    Y: Matrix,
    h: HypothesisFunction<Matrix>,
  ): number;
}

export default Cost;
