import { Row } from 'modules/analysis/matrix/types';
import IAnalysisOptions from 'schemas/analysis/type';

class DataService {
  public getData(data: string[][], options: IAnalysisOptions) {
    const preparedData: Row[] = [];
    let rowsLength = 0;

    if (!data.length || !data[0].length) {
      throw new Error('Data is empty');
    }

    if (1 + options.data.x.length > data[0].length) {
      throw new Error('Too much features rows');
    }

    if (options.data.x.filter((x) => x >= data[0].length).length !== 0) {
      throw new Error('Not existing features rows specified');
    }

    if (1 + options.data.y > data[0].length) {
      throw new Error('Not existing value row specified');
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
        const isIncluded = options.data.x.includes(j) || options.data.y === j;

        if (isIncluded) {
          if (!this.isNumber(element)) {
            throw new Error(
              `${j + 1}th element on ${i + 1}th row has wrong format`,
            );
          }

          row.push(Number(element));
        } else {
          row.push(NaN);
        }
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
