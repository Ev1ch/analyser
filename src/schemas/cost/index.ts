import Joi from 'joi';
import { COST_CONFIG } from 'configs';
import ICostOptions from './type';

const CostSchema = Joi.object<ICostOptions>()
  .keys({
    normalizingRate: Joi.when('shouldNormalize', {
      is: Joi.required(),
      then: Joi.number()
        .min(COST_CONFIG.normalizingRate.minimum)
        .max(COST_CONFIG.normalizingRate.maximum),
      otherwise: Joi.forbidden(),
    }),
    shouldNormalize: Joi.boolean().valid(false, true),
  })
  .min(1);

export default CostSchema;
