import Joi from 'joi';
import FileSchema from 'schemas/file';
import DataSchema from 'schemas/data';
import GradinetSchema from 'schemas/gradient';
import CostSchema from 'schemas/cost';
import IAnalysisOptions from './type';

const AnalysisSchema = Joi.object<IAnalysisOptions>().keys({
  file: FileSchema,
  data: DataSchema,
  gradient: GradinetSchema,
  cost: CostSchema,
});

export default AnalysisSchema;
