import Joi from 'joi';
import IFileOptions from './type';

const FileSchema = Joi.object<IFileOptions>()
  .keys({
    delimiter: Joi.string(),
  })
  .min(1);

export default FileSchema;
