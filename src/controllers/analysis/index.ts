import { Context } from 'koa';
import { File } from 'formidable';
import {
  DataService,
  FilesService,
  OptionsService,
  AnalysisService,
} from 'services';

class AnalysisController {
  private analysisService = new AnalysisService();
  private optionsService = new OptionsService();
  private filesService = new FilesService();
  private dataService = new DataService();

  public async getAnalysis(ctx: Context) {
    try {
      const file = ctx.request.files?.data as File | undefined;

      const options = this.optionsService.getOptions(ctx.request.body.options);
      const content = await this.filesService.getContent(file, options.file);
      const data = this.dataService.getData(content);
      const analysis = this.analysisService.getAnalysis(data, options);

      ctx.body = analysis;
    } catch (error) {
      ctx.body = {
        error: error.message,
      };
    }
  }
}

export default AnalysisController;
