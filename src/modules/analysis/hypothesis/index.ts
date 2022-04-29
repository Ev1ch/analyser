import Matrix from 'modules/analysis/matrix';

class Hypothesis {
  public calculate(theta: Matrix, x: Matrix) {
    return Matrix.multiply(Matrix.transpose(theta), x).get(0, 0);
  }

  public calculateMatrix(theta: Matrix, X: Matrix) {
    return Matrix.multiply(X, theta);
  }
}

export default Hypothesis;
