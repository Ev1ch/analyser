import { Matrix } from 'modules/analysis';
import { HypothesisFunction } from './types';

class Cost {
  constructor(private normalizingRate?: number) {}

  public calculate(
    theta: Matrix,
    X: Matrix,
    y: Matrix,
    h: HypothesisFunction<Matrix>,
  ) {
    const m = y.getHeight();

    const hypothesis = h(theta, X);
    const difference = Matrix.substract(hypothesis, y);
    const k = 1 / (2 * m);
    const sum = Matrix.multiply(Matrix.transpose(difference), difference).get(
      0,
      0,
    );

    if (this.normalizingRate) {
      const error = k * sum;
      const squaredTheta = Matrix.forEachElement(theta, (element) =>
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
