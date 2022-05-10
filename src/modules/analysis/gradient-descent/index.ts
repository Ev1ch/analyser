import { Matrix, Hypothesis } from 'modules/analysis';

class GradientDescent {
  constructor(
    private hypothesis: Hypothesis,
    private iterationsNumber: number,
    private learningRate: number,
    private normalizingRate?: number,
  ) {}

  public run(Theta: Matrix, X: Matrix, Y: Matrix) {
    let currentTheta = Theta;
    for (let i = 0; i < this.iterationsNumber; i++) {
      currentTheta = this.getUpdatedTheta(currentTheta, X, Y);
    }

    return currentTheta;
  }

  private getUpdatedTheta(Theta: Matrix, X: Matrix, Y: Matrix) {
    const m = Y.getHeight();

    const hypothesis = this.hypothesis.calculateMatrix(Theta, X);
    const error = Matrix.substract(hypothesis, Y);
    const sum = Matrix.multiply(Matrix.transpose(X), error);
    const k = Matrix.createNumber(sum.getHeight(), this.learningRate / m);

    if (this.normalizingRate) {
      const normalization = Matrix.createNumber(
        Theta.getHeight(),
        this.normalizingRate / m,
      );

      return Matrix.substract(
        Theta,
        Matrix.add(
          Matrix.multiply(k, sum),
          Matrix.multiply(normalization, Theta),
        ),
      );
    }

    return Matrix.substract(Theta, Matrix.multiply(k, sum));
  }
}

export default GradientDescent;
