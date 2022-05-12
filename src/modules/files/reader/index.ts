import { createReadStream } from 'fs';

class FilesReader {
  public async readCsv(filepath: string, delimiter: string) {
    const content = await this.readFile(filepath);
    const rows = content.replace(/\r\n/g, '\n').split('\n');
    const fixedRows: string[][] = [];

    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];

      if (row.trim().length !== 0) {
        fixedRows.push(rows[i].split(delimiter));
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

export default FilesReader;
