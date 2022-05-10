import { File } from 'formidable';
import { FILES_CONFIG } from 'configs';
import { FilesReader } from 'modules/files';
import IFileOptions from 'schemas/file/type';

class FilesService {
  private reader = new FilesReader();

  public async getContent(file: File | undefined, options?: IFileOptions) {
    if (!file) {
      throw new Error('File is not present');
    }

    const fileExtention = file.originalFilename.split('.').at(-1)!;
    if (!FILES_CONFIG.extentions.includes(fileExtention)) {
      throw new Error('File has wrong extention');
    }

    if (file.size > FILES_CONFIG.size.maximum) {
      throw new Error('File is too large');
    }

    const preparedOptions =
      options?.delimiter || FILES_CONFIG.delimiter.initial;
    const content = await this.reader.readCsv(file.filepath, preparedOptions);

    return content;
  }
}

export default FilesService;
