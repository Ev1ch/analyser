class Range {
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

  public hasOnlySameNumbers() {
    if (this.data.length === 0) {
      return true;
    }

    const number = this.data[0];
    for (let i = 1; i < this.data.length; i++) {
      if (number !== this.data[i]) {
        return false;
      }
    }

    return true;
  }

  public getRange() {
    return this.getMaximum() - this.getMinimum();
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
