import Joi from 'joi';
import IDataOptions from './type';
import { DATA_CONFIG } from 'configs/analysis';

const START_ARRAY_INDEX = 0;

const DataSchema = Joi.object<IDataOptions>()
  .keys({
    x: Joi.array()
      .items(
        Joi.number()
          .min(START_ARRAY_INDEX)
          .max(
            DATA_CONFIG.FEATURES.maximumNumber +
              DATA_CONFIG.VALUES.maximumNumber -
              1,
          ),
      )
      .min(DATA_CONFIG.FEATURES.minimumNumber)
      .max(DATA_CONFIG.FEATURES.maximumNumber)
      .unique()
      .required(),
    y: Joi.number()
      .min(START_ARRAY_INDEX)
      .max(
        DATA_CONFIG.FEATURES.maximumNumber +
          DATA_CONFIG.VALUES.maximumNumber -
          1,
      )
      .not(Joi.in('x'))
      .required(),
    shouldNormalize: Joi.boolean().valid(true, false),
  })
  .required();

export default DataSchema;
