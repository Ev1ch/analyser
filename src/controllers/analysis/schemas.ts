import Joi from 'joi';
import { IAnalysisOptions } from './types';

export const AnalysisSchema = Joi.object<IAnalysisOptions>({
  data: Joi.object({
    x: Joi.array().items(Joi.number()).required(),
    y: Joi.number().required(),
  }),
  gradient: Joi.object({
    iterationsNumber: Joi.number(),
    learningRate: Joi.number(),
  }),
});
