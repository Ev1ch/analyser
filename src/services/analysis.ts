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

class AnalysisService {
  public getAnalysis(data: Row[], options: IAnalysisOptions) {
    const matrix = new Matrix(data);
    const hypothesis = new Hypothesis();
    const gradientDescent = new GradientDescent(
      hypothesis,
      options.gradient?.iterationsNumber ||
        GRADIENT_CONFIG.iterations.initialNumber,
      options.gradient?.learningRate || GRADIENT_CONFIG.learningRate.initial,
      options.gradient?.shouldNormalize
        ? options.gradient?.normalizingRate ||
          GRADIENT_CONFIG.normalizingRate.initial
        : undefined,
    );

    const X = new Matrix(matrix.getColumns(...options.data.x));
    const additionalColumn: Column = Array(X.getHeight()).fill([1]);
    X.preppendColumn(additionalColumn);

    if (options.data.shouldNormalize) {
      const normalization = new Normalization();
      normalization.normalize(X);
    }

    const Y = new Matrix(matrix.getColumn(options.data.y));

    const thetaColumn = options.gradient?.initialTheta
      ? Array.isArray(options.gradient.initialTheta)
        ? options.gradient.initialTheta
        : Array(X.getWidth()).fill(options.gradient.initialTheta)
      : Array(X.getWidth()).fill(GRADIENT_CONFIG.theta.initial);
    const Theta = Matrix.createVector(thetaColumn);

    return gradientDescent.run(Theta, X, Y);
  }
}

export default AnalysisService;
