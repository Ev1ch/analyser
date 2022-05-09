import Matrix from 'modules/analysis/matrix';
import { IAnalysisOptions } from 'controllers/analysis/types';
import { GRADIENT_CONFIG } from 'configs/analysis';
import { Column, Row } from 'modules/analysis/matrix/types';
import GradientDescent from 'modules/analysis/gradient-descent';
import Normalization from 'modules/analysis/normalization';
import Hypothesis from 'modules/analysis/hypothesis';

class AnalysisService {
  public getAnalysis(data: Row[], options: IAnalysisOptions) {
    const matrix = new Matrix(data);
    const hypothesis = new Hypothesis();
    const gradientDescent = new GradientDescent(
      hypothesis,
      options.gradient?.iterationsNumber ||
        GRADIENT_CONFIG.ITERATIONS.initialNumber,
      options.gradient?.learningRate || GRADIENT_CONFIG.LEARNING_RATE.initial,
      options.gradient?.shouldNormalize
        ? options.gradient?.normalizingRate ||
          GRADIENT_CONFIG.NORMALIZING_RATE.initial
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
      : Array(X.getWidth()).fill(GRADIENT_CONFIG.THETA.initial);
    const Theta = Matrix.createVector(thetaColumn);

    return gradientDescent.run(Theta, X, Y);
  }
}

export default AnalysisService;
