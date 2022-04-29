import Matrix from 'modules/analysis/matrix';
import Hypothesis from 'modules/analysis/hypothesis';

class GradientDescent {
  private hypothesis = new Hypothesis();

  constructor(private iterationsNumber = 1500, private alpha = 0.01) {}

  public setIterationsNumber(iterationsNumber: number) {
    this.iterationsNumber = iterationsNumber;
  }

  public setAlpha(alpha: number) {
    this.alpha = alpha;
  }

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
    const k = Matrix.createNumber(sum.getHeight(), this.alpha / m);

    return Matrix.substract(Theta, Matrix.multiply(k, sum));
  }
}

export default GradientDescent;
