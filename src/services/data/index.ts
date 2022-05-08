import { Row } from 'modules/analysis/matrix/types';

class DataService {
  public getData(data: string[][]) {
    const preparedData: Row[] = [];
    let rowsLength = 0;

    if (!data.length) {
      throw new Error('Data is empty');
    }

    for (let i = 0; i < data.length; i++) {
      const row: Row = [];

      if (i === 0) {
        rowsLength = data[i].length;
      } else if (data[i].length !== rowsLength) {
        throw new Error(
          `${i + 1}th row has different elements number from previous ones`,
        );
      }

      for (let j = 0; j < data[i].length; j++) {
        const element = data[i][j];

        if (!this.isNumber(element)) {
          throw new Error(
            `${j + 1}th element on ${i + 1}th row has wrong format`,
          );
        }

        row.push(Number(element));
      }

      preparedData.push(row);
    }

    return preparedData;
  }

  private isNumber(number: string) {
    const numberRegex = /^-?[0-9]+(?:\.[0-9]+)?$/;
    return numberRegex.test(number);
  }
}

export default DataService;
