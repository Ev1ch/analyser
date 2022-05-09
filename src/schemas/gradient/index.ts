import Joi from 'joi';
import IGradientOptions from './type';
import { GRADIENT_CONFIG } from 'configs/analysis';

const GradinetSchema = Joi.object<IGradientOptions>()
  .keys({
    initialTheta: [
      Joi.array()
        .items(Joi.number())
        .length(
          Joi.ref('...data.x.length', {
            adjust: (length: number) => length + 1,
          }),
        ),
      Joi.number()
        .min(GRADIENT_CONFIG.THETA.minimum)
        .max(GRADIENT_CONFIG.THETA.maximum),
    ],
    iterationsNumber: Joi.number()
      .min(GRADIENT_CONFIG.ITERATIONS.minimumNumber)
      .max(GRADIENT_CONFIG.ITERATIONS.maximumNumber),
    learningRate: Joi.number()
      .min(GRADIENT_CONFIG.LEARNING_RATE.minimum)
      .max(GRADIENT_CONFIG.LEARNING_RATE.maximum),
    shouldNormalize: Joi.boolean().valid(true, false),
    normalizingRate: Joi.when('shouldNormalize', {
      is: Joi.valid(true),
      then: Joi.number()
        .min(GRADIENT_CONFIG.NORMALIZING_RATE.minimum)
        .max(GRADIENT_CONFIG.NORMALIZING_RATE.maximum),
      otherwise: Joi.forbidden(),
    }),
  })
  .min(1);

export default GradinetSchema;
