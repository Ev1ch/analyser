import { GRADIENT_CONFIG } from 'configs';
import { Column, Row } from 'modules/analysis/matrix/types';
import {
  GradientDescent,
  Normalization,
  Hypothesis,
  Matrix,
} from 'modules/analysis';
import IAnalysisOptions from 'schemas/analysis/type';
import IGradientOptions from 'schemas/gradient/type';
import IDataOptions from 'schemas/data/type';

class AnalysisService {
  public getAnalysis(data: Row[], options: IAnalysisOptions) {
    const matrix = new Matrix(data);
    const gradientDescent = this.getGradientDescent(options.gradient);

    const X = this.getX(matrix, options.data);
    const y = new Matrix(matrix.getColumn(options.data.y));
    const theta = this.getTheta(X, options.gradient);

    return gradientDescent.run(theta, X, y);
  }

  private getGradientDescent(options?: IGradientOptions) {
    const hypothesis = new Hypothesis();
    const iterationsNumber =
      options?.iterationsNumber ?? GRADIENT_CONFIG.iterations.initialNumber;
    const learningRate =
      options?.learningRate ?? GRADIENT_CONFIG.learningRate.initial;
    const normalizingRate = options?.shouldNormalize
      ? options?.normalizingRate ?? GRADIENT_CONFIG.normalizingRate.initial
      : undefined;

    return new GradientDescent(
      hypothesis,
      iterationsNumber,
      learningRate,
      normalizingRate,
    );
  }

  private getX(data: Matrix, options: IDataOptions) {
    const X = new Matrix(data.getColumns(...options.x));
    const additionalColumn: Column = Array(X.getHeight()).fill([1]);
    X.preppendColumn(additionalColumn);

    if (options.shouldNormalize) {
      const normalization = new Normalization();
      normalization.normalize(X);
    }

    return X;
  }

  private getTheta(X: Matrix, options?: IGradientOptions) {
    if (!options || options.initialTheta === undefined) {
      const thetaColumn = Array(X.getWidth()).fill(
        GRADIENT_CONFIG.theta.initial,
      );
      return Matrix.createVector(thetaColumn);
    }

    if (Array.isArray(options.initialTheta)) {
      return Matrix.createVector(options.initialTheta);
    }

    const thetaColumn = Array(X.getWidth()).fill(options.initialTheta);
    return Matrix.createVector(thetaColumn);
  }
}

export default AnalysisService;
