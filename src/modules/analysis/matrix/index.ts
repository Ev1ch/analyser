import { Column, Modifier, Row, Tuple } from './types';

class Matrix {
  constructor(private data: Row[]) {}

  public static transpose(matrix: Matrix) {
    return matrix.clone().transpose();
  }

  public static multiply(a: Matrix, b: Matrix) {
    return a.clone().multiply(b);
  }

  public static substract(a: Matrix, b: Matrix) {
    return a.clone().subtract(b);
  }

  public static add(a: Matrix, b: Matrix) {
    return a.clone().add(b);
  }

  public static createVector(args: number[]) {
    const data: Row[] = [];

    for (let i = 0; i < args.length; i++) {
      data.push([args[i]]);
    }

    return new Matrix(data);
  }

  public static createNumber(dimention: number, number: number) {
    if (dimention < 1) {
      throw new Error('Wrong dimetion specified');
    }

    const data: Row[] = [];

    for (let i = 0; i < dimention; i++) {
      const row: Row = [];

      for (let j = 0; j < dimention; j++) {
        if (i === j) {
          row.push(number);
        } else {
          row.push(0);
        }
      }

      data.push(row);
    }

    return new Matrix(data);
  }

  public static forEachElement(matrix: Matrix, modifier: Modifier) {
    const modifiedMatrix = matrix.clone();

    for (let i = 0; i < modifiedMatrix.getHeight(); i++) {
      for (let j = 0; j < modifiedMatrix.getWidth(); j++) {
        const element = modifiedMatrix.get(i, j);

        modifiedMatrix.set(modifier(element, i, j), i, j);
      }
    }

    return modifiedMatrix;
  }

  public isSquared() {
    if (!this.data[0]) {
      return false;
    }

    if (this.data.length !== this.data[0].length) {
      return false;
    }

    return true;
  }

  public isEmpty() {
    if (this.data.length !== 0) {
      return false;
    }

    return true;
  }

  public clone() {
    return new Matrix(JSON.parse(JSON.stringify(this.data)));
  }

  public getHeight() {
    return this.data.length;
  }

  public getWidth() {
    if (this.data[0]) {
      return this.data[0].length;
    }

    return 0;
  }

  public getDimentions(): Tuple<number, 2> {
    return [this.data.length, this.data[0]?.length ?? 0];
  }

  public getSum() {
    let sum = 0;

    for (let i = 0; i < this.data.length; i++) {
      const row = this.data[i];

      for (let j = 0; j < row.length; j++) {
        const element = row[j];
        sum += element;
      }
    }

    return sum;
  }

  public transpose() {
    const transposedData: Row[] = [];

    for (let i = 0; i < this.data.length; i++) {
      const row = this.data[i];

      for (let j = 0; j < row.length; j++) {
        if (transposedData[j]) {
          transposedData[j].push(row[j]);
        } else {
          transposedData.push([row[j]]);
        }
      }
    }

    this.data = transposedData;

    return this;
  }

  public get(i: number, j: number = i) {
    return this.data[i][j];
  }

  public set(element: number, i: number, j: number = i) {
    if (
      !this.isCoordinateCorrect(i, this.getHeight) ||
      !this.isCoordinateCorrect(j, this.getWidth)
    ) {
      throw new Error('Wrong coordinates specified');
    }

    this.data[i][j] = element;

    return this;
  }

  public getRow(i: number) {
    if (!this.isCoordinateCorrect(i, this.getHeight)) {
      throw new Error('Wrong row specified');
    }

    return this.data[i];
  }

  public getColumn(j: number) {
    if (!this.isCoordinateCorrect(j, this.getWidth)) {
      throw new Error('Wrong column specified');
    }

    const column: Column = [];

    for (let i = 0; i < this.getHeight(); i++) {
      const row = this.data[i];

      column.push([row[j]]);
    }

    return column;
  }

  public getRowsSlice(i1: number, i2: number) {
    if (
      !this.isCoordinateCorrect(i1, this.getHeight) ||
      !this.isCoordinateCorrect(i1, this.getHeight) ||
      i2 < i1
    ) {
      throw new Error('Wrong rows range specified');
    }

    const rows: Row[] = [];

    for (let i = i1; i <= i2; i++) {
      const row = this.data[i];

      rows.push(row);
    }

    return rows;
  }

  public getColumnsSlice(j1: number, j2: number) {
    if (
      !this.isCoordinateCorrect(j1, this.getWidth) ||
      !this.isCoordinateCorrect(j1, this.getWidth) ||
      j2 < j1
    ) {
      throw new Error('Wrong columns range specified');
    }

    const columns: number[][] = [];

    for (let i = 0; i < this.getHeight(); i++) {
      const row = this.data[i];

      columns.push([]);
      for (let j = j1; j <= j2; j++) {
        columns.at(-1)!.push(row[j]);
      }
    }

    return columns;
  }

  public getColumns(...js: number[]) {
    const columns: number[][] = [];

    for (let i = 0; i < this.getHeight(); i++) {
      const dataRow = this.data[i];

      const row = [];
      for (let k = 0; k < js.length; k++) {
        const j = js[k];
        row.push(dataRow[j]);
      }

      columns.push(row);
    }

    return columns;
  }

  public fill(element: number) {
    for (let i = 0; i < this.data.length; i++) {
      const row = this.data[i];

      for (let j = 0; j < this.data[i].length; j++) {
        row[j] = element;
      }
    }

    return this;
  }

  public preppendRow(row: Row) {
    if (!this.canRowBeAdded(row)) {
      throw new Error('Matrix is empty or wrong row dimention');
    }

    this.data.unshift(row);

    return this;
  }

  public appendRow(row: Row) {
    if (!this.canRowBeAdded(row)) {
      throw new Error('Matrix is empty or wrong row dimention');
    }

    this.data.push(row);

    return this;
  }

  public preppendColumn(column: Column) {
    if (!this.canColumnBeAdded(column)) {
      throw new Error('Matrix is empty or wrong column dimention');
    }

    for (let i = 0; i < column.length; i++) {
      const row = this.data[i] || [];
      row.unshift(column[i][0]);
    }

    return this;
  }

  public appendColumn(column: Column) {
    if (!this.canColumnBeAdded(column)) {
      throw new Error('Matrix is empty or wrong column dimention');
    }

    for (let i = 0; i < column.length; i++) {
      const row = this.data[i] || [];
      row.push(column[i][0]);
    }

    return this;
  }

  public multiply(matrix: Matrix) {
    if (this.getWidth() !== matrix.getHeight()) {
      throw new Error('Wrong multiplicand dimentions');
    }

    const data: number[][] = [];

    for (let i = 0; i < this.getHeight(); i++) {
      const row: number[] = [];
      const a = this.data[i];

      for (let j = 0; j < matrix.getWidth(); j++) {
        const b = this.createRowFromColumn(matrix.getColumn(j));
        const multiplication = this.multiplyRows(a, b);

        row.push(multiplication);
      }

      data.push(row);
    }

    this.data = data;

    return this;
  }

  public add(matrix: Matrix) {
    if (!this.haveSameDimentions(matrix)) {
      throw new Error('Wrong summand dimentions');
    }

    for (let i = 0; i < this.getHeight(); i++) {
      for (let j = 0; j < this.getWidth(); j++) {
        const element = this.get(i, j);

        this.set(element + matrix.get(i, j), i, j);
      }
    }

    return this;
  }

  public subtract(matrix: Matrix) {
    if (!this.haveSameDimentions(matrix)) {
      throw new Error('Wrong subtractor dimentions');
    }

    for (let i = 0; i < this.getHeight(); i++) {
      for (let j = 0; j < this.getWidth(); j++) {
        const element = this.get(i, j);

        this.set(element - matrix.get(i, j), i, j);
      }
    }

    return this;
  }

  public haveSameDimentions(matrix: Matrix) {
    if (this.getHeight() !== matrix.getHeight()) {
      return false;
    }

    if (this.getWidth() !== matrix.getWidth()) {
      return false;
    }

    return true;
  }

  private multiplyRows(a: Row, b: Row) {
    if (a.length !== b.length) {
      throw new Error('Wrong multiplicand dimentions');
    }

    let sum = 0;
    for (let i = 0; i < a.length; i++) {
      sum += a[i] * b[i];
    }

    return sum;
  }

  private createRowFromColumn(column: Column) {
    const row: Row = [];

    for (let i = 0; i < column.length; i++) {
      row.push(column[i][0]);
    }

    return row;
  }

  private isCoordinateCorrect(coordinate: number, getDimention: () => number) {
    if (coordinate < 0 || coordinate >= getDimention.bind(this)()) {
      return false;
    }

    return true;
  }

  private canRowBeAdded(row: Row) {
    if (!row.length || this.data[0]?.length !== row.length) {
      return false;
    }

    return true;
  }

  private canColumnBeAdded(column: Column) {
    if (column.length === 0) {
      return false;
    }

    if (!this.isEmpty() && this.data.length !== column.length) {
      return false;
    }

    if (column.find((element: number[]) => element.length > 1)) {
      return false;
    }

    return true;
  }
}

export default Matrix;
