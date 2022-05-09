import IFileOptions from '../file/type';
import IDataOptions from '../data/type';
import IGradientOptions from '../gradient/type';
import ICostOptions from '../cost/type';

interface IAnalysisOptions {
  file?: IFileOptions;
  data: IDataOptions;
  gradient?: IGradientOptions;
  cost?: ICostOptions;
}

export default IAnalysisOptions;
