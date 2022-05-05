import Matrix from 'modules/analysis/matrix';
import Cost from './abstract';
import { HypothesisFunction } from './types';

class RegularCost extends Cost {
  public calculate(
    Theta: Matrix,
    X: Matrix,
    Y: Matrix,
    h: HypothesisFunction<Matrix>,
  ) {
    const m = Y.getHeight();

    const hypothesis = h(Theta, X);
    const difference = Matrix.substract(hypothesis, Y);
    const k = 1 / (2 * m);
    const sum = Matrix.multiply(Matrix.transpose(difference), difference).get(
      0,
      0,
    );

    return k * sum;
  }
}

export default RegularCost;
