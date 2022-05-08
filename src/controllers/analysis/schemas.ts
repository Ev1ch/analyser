import Joi from 'joi';
import { COST_CONFIG, DATA_CONFIG, GRADIENT_CONFIG } from 'configs/analysis';
import {
  IAnalysisOptions,
  ICostOptions,
  IDataOptions,
  IFileOptions,
  IGradientOptions,
} from './types';

const START_ARRAY_INDEX = 0;
const BOOLEANS = [false, true];

export const FileSchema = Joi.object<IFileOptions>()
  .keys({
    delimiter: Joi.string(),
  })
  .min(1);

export const DataSchema = Joi.object<IDataOptions>()
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
    shouldNormalize: Joi.boolean().valid(...BOOLEANS),
  })
  .required();

export const CostSchema = Joi.object<ICostOptions>()
  .keys({
    normalizingRate: Joi.when('shouldNormalize', {
      is: Joi.required(),
      then: Joi.number()
        .min(COST_CONFIG.NORMALIZING_RATE.minimum)
        .max(COST_CONFIG.NORMALIZING_RATE.maximum),
      otherwise: Joi.forbidden(),
    }),
    shouldNormalize: Joi.boolean().valid(...BOOLEANS),
  })
  .min(1);

export const GradinetSchema = Joi.object<IGradientOptions>()
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
    shouldNormalize: Joi.boolean().valid(...BOOLEANS),
    normalizingRate: Joi.when('shouldNormalize', {
      is: Joi.valid(true),
      then: Joi.number()
        .min(GRADIENT_CONFIG.NORMALIZING_RATE.minimum)
        .max(GRADIENT_CONFIG.NORMALIZING_RATE.maximum),
      otherwise: Joi.forbidden(),
    }),
  })
  .min(1);

export const AnalysisSchema = Joi.object<IAnalysisOptions>().keys({
  file: FileSchema,
  data: DataSchema,
  gradient: GradinetSchema,
  cost: CostSchema,
});
