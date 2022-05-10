import { Matrix, Hypothesis } from 'modules/analysis';

class GradientDescent {
  constructor(
    private hypothesis: Hypothesis,
    private iterationsNumber: number,
    private learningRate: number,
    private normalizingRate?: number,
  ) {}

  public run(theta: Matrix, X: Matrix, y: Matrix) {
    let currentTheta = theta;
    for (let i = 0; i < this.iterationsNumber; i++) {
      currentTheta = this.getUpdatedTheta(currentTheta, X, y);
    }

    return currentTheta;
  }

  private getUpdatedTheta(theta: Matrix, X: Matrix, y: Matrix) {
    const m = y.getHeight();

    const hypothesis = this.hypothesis.calculateMatrix(theta, X);
    const error = Matrix.substract(hypothesis, y);
    const sum = Matrix.multiply(Matrix.transpose(X), error);
    const k = Matrix.createNumber(sum.getHeight(), this.learningRate / m);

    if (this.normalizingRate) {
      const normalization = Matrix.createNumber(
        theta.getHeight(),
        this.normalizingRate / m,
      );

      return Matrix.substract(
        theta,
        Matrix.add(
          Matrix.multiply(k, sum),
          Matrix.multiply(normalization, theta),
        ),
      );
    }

    return Matrix.substract(theta, Matrix.multiply(k, sum));
  }
}

export default GradientDescent;
