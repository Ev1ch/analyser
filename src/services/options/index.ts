import { AnalysisSchema } from 'controllers/analysis/schemas';
import { IAnalysisOptions } from 'controllers/analysis/types';

class OptionsService {
  public getOptions(options: unknown) {
    if (typeof options !== 'string') {
      throw new Error('Wrong options');
    }

    let preparedOptions: IAnalysisOptions;
    try {
      preparedOptions = JSON.parse(options);
    } catch {
      throw new Error('Wrong format of options');
    }

    const { error } = AnalysisSchema.validate(preparedOptions);

    if (error) {
      throw new Error(error.message);
    }

    return preparedOptions;
  }
}

export default OptionsService;
