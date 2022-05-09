import { AnalysisSchema } from 'schemas';
import IAnalysisOptions from 'schemas/analysis/type';

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
