import { Matrix, Range } from 'modules/analysis';

class Normalization {
  public normalize(X: Matrix) {
    const ranges = this.getRanges(X);
    for (let i = 0; i < X.getHeight(); i++) {
      for (let j = 0; j < X.getWidth(); j++) {
        const range = ranges[j];
        const element = X.get(i, j);

        if (range.hasOnlySameNumbers()) {
          X.set(element, i, j);
        } else {
          const normalizedElement = this.getNormalizedElement(element, range);
          X.set(normalizedElement, i, j);
        }
      }
    }
  }

  private getRanges(X: Matrix) {
    const ranges: Range[] = [];

    for (let i = 0; i < X.getHeight(); i++) {
      for (let j = 0; j < X.getWidth(); j++) {
        const element = X.get(i, j);

        if (!ranges[j]) {
          ranges[j] = new Range([element]);
        } else {
          ranges[j].addElement(element);
        }
      }
    }

    return ranges;
  }

  private getNormalizedElement(element: number, range: Range) {
    return (element - range.getAverage()) / range.getStandartDeviation();
  }
}

export default Normalization;
