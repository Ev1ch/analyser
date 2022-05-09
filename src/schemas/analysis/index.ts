import Joi from 'joi';
import FileSchema from '../file';
import DataSchema from '../data';
import GradinetSchema from '../gradient';
import CostSchema from '../cost';
import IAnalysisOptions from './type';

const AnalysisSchema = Joi.object<IAnalysisOptions>().keys({
  file: FileSchema,
  data: DataSchema,
  gradient: GradinetSchema,
  cost: CostSchema,
});

export default AnalysisSchema;
