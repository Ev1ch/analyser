import { createReadStream } from 'fs';

interface IReadCsvOptions {
  delimiter: string;
  endOfLine: string;
}

export default class FilesReader {
  public async readCsv(
    filepath: string,
    options: IReadCsvOptions = {
      delimiter: ',',
      endOfLine: '\n',
    },
  ) {
    const content = await this.readFile(filepath);
    const rows = content.split(options.endOfLine);
    const fixedRows: string[][] = [];

    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];

      if (row.trim().length !== 0) {
        fixedRows.push(rows[i].split(options.delimiter));
      }
    }

    return fixedRows;
  }

  private readFile(
    path: string,
    encoding: BufferEncoding = 'utf8',
  ): Promise<string> {
    return new Promise((resolve) => {
      const stream = createReadStream(path).setEncoding(encoding);
      let content = '';

      stream
        .on('data', (data) => {
          content += data;
        })
        .on('end', () => {
          resolve(content);
        });
    });
  }
}
