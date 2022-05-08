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
    const map: Record<number, number> = {};

    for (let i = 0; i < this.data.length; i++) {
      const number = this.data[i];

      if (map[number]) {
        map[number]++;
      } else {
        map[number] = 1;
      }
    }

    if (Object.keys(map).length > 1) {
      return false;
    }

    return true;
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
