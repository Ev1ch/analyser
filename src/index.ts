import Koa from 'koa';
import Router from 'koa-router';
import koaBody from 'koa-body';
import apiRouter from 'api';
import { PORT, API_ROOT, BODY_CONFIG } from 'configs/server';

const app = new Koa();
const router = new Router();

router.use(API_ROOT, apiRouter.routes(), apiRouter.allowedMethods());
app.use(koaBody(BODY_CONFIG));
app.use(router.routes()).use(router.allowedMethods());

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
