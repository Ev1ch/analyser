class Range {
  /**
   * R
   * @param data
   */
  constructor(private data: number[] = []) {}

  public getMinimum() {
    return Math.min(...this.data);
  }

  public getMaximum() {
    return Math.max(...this.data);
  }

  public addElement(element: number) {
    this.data.push(element);
  }

  public getStandartDeviation() {
    const n = this.data.length;

    return Math.sqrt(
      this.data.reduce(
        (sum, element) => sum + Math.pow(element - this.getAverage(), 2),
        0,
      ) /
        (n - 1),
    );
  }

  public getAverage() {
    return this.data.reduce(
      (sum, element) => sum + element / this.data.length,
      0,
    );
  }
}

export default Range;
