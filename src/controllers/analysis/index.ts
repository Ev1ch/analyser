import { Context } from 'koa';
import { File } from 'formidable';
import { AnalysisService } from 'services';
import { FileSizes, FilesReader } from 'modules/files';
import { DATA_CONFIG } from 'configs/analysis';
import { AnalysisSchema } from './schemas';

class ValidationError extends Error {}

class AnalysisController {
  private filesReader = new FilesReader();
  private fileSizes = new FileSizes();
  private analysisService = new AnalysisService();

  public async getAnalysis(ctx: Context) {
    try {
      const file = ctx.request.files?.data as File;
      const options = ctx.request.body;

      if (!this.isFileValid(file)) {
        throw new ValidationError('File');
      }

      console.log(options);

      if (!this.areOptionsValid(options)) {
        throw new ValidationError('Options');
      }

      const data = await this.filesReader.readCsv(file.path);
      const analysis = this.analysisService.getAnalysis(data, options);

      ctx.body = analysis;
    } catch (error) {
      ctx.body = {
        error: error.message,
      };
    }
  }

  private isFileValid(file: File) {
    if (this.fileSizes.getMbFromB(file.size) > DATA_CONFIG.maximumFileSize) {
      return false;
    }

    return true;
  }

  private areOptionsValid(options: unknown) {
    const { error } = AnalysisSchema.validate(options);

    if (error) {
      return false;
    }

    return true;
  }
}

export default AnalysisController;
