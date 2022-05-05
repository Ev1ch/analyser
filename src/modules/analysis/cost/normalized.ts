import Matrix from 'modules/analysis/matrix';
import Cost from './abstract';
import { HypothesisFunction } from './types';

class NormalizedCost extends Cost {
  constructor(private lambda: number) {
    super();
  }

  public setLambda(lambda: number) {
    this.lambda = lambda;
  }

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
    const error = k * sum;
    const squaredTheta = Matrix.forEachElement(Theta, (element) =>
      Math.pow(element, 2),
    );
    const normalization = (this.lambda / (2 * m)) * squaredTheta.getSum();

    return error + normalization;
  }
}

export default NormalizedCost;
