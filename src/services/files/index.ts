import { File } from 'formidable';
import { FILE_CONFIG } from 'configs/analysis';
import { FilesReader } from 'modules/files';
import { IFileOptions } from 'controllers/analysis/types';

class FilesService {
  private reader = new FilesReader();

  public async getContent(file: File | undefined, options?: IFileOptions) {
    if (!file) {
      throw new Error('File is not present');
    }

    if (file.size > FILE_CONFIG.SIZE.maximum) {
      throw new Error('File is too large');
    }

    const preparedOptions = options?.delimiter || FILE_CONFIG.DELIMITER.initial;
    const content = await this.reader.readCsv(file.filepath, preparedOptions);

    return content;
  }
}

export default FilesService;
