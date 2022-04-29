import Matrix from 'modules/analysis/matrix';
import Range from 'modules/analysis/range';

class Normalization {
  public normalize(feature: Matrix) {
    const m = feature.getHeight();
    const n = feature.getWidth();
    const ranges = this.getRanges(feature);

    for (let i = 0; i < m; i++) {
      for (let j = 0; j < n; j++) {
        const range = ranges[j];
        const element = feature.get(i, j);
        const normalizedElement = this.getNormalizedElement(element, range);

        feature.set(normalizedElement, i, j);
      }
    }
  }

  private getRanges(feature: Matrix) {
    const m = feature.getHeight();
    const n = feature.getWidth();
    const ranges: Range[] = [];

    for (let i = 0; i < m; i++) {
      for (let j = 0; j < n; j++) {
        const element = feature.get(i, j);

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
