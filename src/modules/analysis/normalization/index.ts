import { Matrix, Range } from 'modules/analysis';

class Normalization {
  public normalize(X: Matrix) {
    const ranges = this.getRanges(X);

    for (let j = 0; j < X.getWidth(); j++) {
      const range = ranges[j];
      const average = range.getAverage();
      const s = range.getRange();
      const hasOnlySameNumbers = range.hasOnlySameNumbers();

      for (let i = 0; i < X.getHeight(); i++) {
        const element = X.get(i, j);

        if (hasOnlySameNumbers) {
          X.set(element, i, j);
        } else {
          const normalizedElement = this.getNormalizedElement(
            element,
            average,
            s,
          );
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

  private getNormalizedElement(
    element: number,
    average: number,
    range: number,
  ) {
    return (element - average) / range;
  }
}

export default Normalization;
