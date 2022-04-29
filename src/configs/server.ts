import 'dotenv/config';
import { IKoaBodyOptions } from 'koa-body';

export const PORT = process.env.PORT || 3000;

export const API_ROOT = '/api';

export const BODY_CONFIG: IKoaBodyOptions = {
  multipart: true,
  urlencoded: true,
};
