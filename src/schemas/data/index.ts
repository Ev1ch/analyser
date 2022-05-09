import Joi from 'joi';
import IDataOptions from './type';
import { DATA_CONFIG } from 'configs';

const START_ARRAY_INDEX = 0;
const END_ARRAY_INDEX =
  DATA_CONFIG.values.maximumNumber + DATA_CONFIG.values.maximumNumber - 1;

const DataSchema = Joi.object<IDataOptions>()
  .keys({
    x: Joi.array()
      .items(Joi.number().min(START_ARRAY_INDEX).max(END_ARRAY_INDEX))
      .min(DATA_CONFIG.features.minimumNumber)
      .max(DATA_CONFIG.features.maximumNumber)
      .unique()
      .required(),
    y: Joi.number()
      .min(START_ARRAY_INDEX)
      .max(END_ARRAY_INDEX)
      .not(Joi.in('x'))
      .required(),
    shouldNormalize: Joi.boolean().valid(true, false),
  })
  .required();

export default DataSchema;
