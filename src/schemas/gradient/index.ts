import Joi from 'joi';
import IGradientOptions from './type';
import { GRADIENT_CONFIG } from 'configs';

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
        .min(GRADIENT_CONFIG.theta.minimum)
        .max(GRADIENT_CONFIG.theta.maximum),
    ],
    iterationsNumber: Joi.number()
      .min(GRADIENT_CONFIG.iterations.minimumNumber)
      .max(GRADIENT_CONFIG.iterations.maximumNumber),
    learningRate: Joi.number()
      .min(GRADIENT_CONFIG.learningRate.minimum)
      .max(GRADIENT_CONFIG.learningRate.maximum),
    shouldNormalize: Joi.boolean().valid(true, false),
    normalizingRate: Joi.when('shouldNormalize', {
      is: Joi.valid(true),
      then: Joi.number()
        .min(GRADIENT_CONFIG.normalizingRate.minimum)
        .max(GRADIENT_CONFIG.normalizingRate.maximum),
      otherwise: Joi.forbidden(),
    }),
  })
  .min(1);

export default GradinetSchema;
