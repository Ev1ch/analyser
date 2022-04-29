import Matrix from 'modules/analysis/matrix';
import { Column } from 'modules/analysis/matrix/types';
import GradientDescent from 'modules/analysis/gradient-descent';
import Normalization from 'modules/analysis/normalization';
import { GRADIENT_CONFIG } from 'configs/analysis';

// (async () => {
//   const filesReader = new FilesReader();

//   rawData.shift();

//   const data = rawData.map((row) => row.map(Number));

//   const normalization = new Normalization();

//   console.log('Gradient theta', result);
// })();

class AnalysisService {
  private normalization = new Normalization();
  private gradientDescent = new GradientDescent(
    GRADIENT_CONFIG.initialIterationsNumber,
    GRADIENT_CONFIG.initialLearningRate,
  );

  public getAnalysis(
    rawData: string[][],
    { x, y }: { x: number[]; y: number },
  ) {
    const data = this.mapData(rawData);
    const dataMatrix = new Matrix(data);

    const X = new Matrix(dataMatrix.getColumns(...x));
    this.prepareX(X);
    const Y = new Matrix(dataMatrix.getColumn(y));
    const thetaColumn = Array(X.getWidth()).fill(0);
    const Theta = Matrix.createVector(thetaColumn);

    return this.gradientDescent.run(Theta, X, Y);
  }

  private mapData(rawData: string[][]) {
    return rawData.map((row) => row.map(Number));
  }

  private prepareX(X: Matrix) {
    const additionalColumn: Column = Array(X.getHeight()).fill([1]);
    this.normalization.normalize(X);
    X.preppendColumn(additionalColumn);
  }
}

export default AnalysisService;
