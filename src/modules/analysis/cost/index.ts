import Matrix from 'modules/analysis/matrix';
import { HypothesisFunction } from './types';

class Cost {
  constructor(private normalizingRate?: number) {}

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

    if (this.normalizingRate) {
      const error = k * sum;
      const squaredTheta = Matrix.forEachElement(Theta, (element) =>
        Math.pow(element, 2),
      );
      const normalization =
        (this.normalizingRate / (2 * m)) * squaredTheta.getSum();

      return error + normalization;
    }

    return k * sum;
  }
}

export default Cost;
