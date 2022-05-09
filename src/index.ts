import Koa from 'koa';
import Router from 'koa-router';
import koaBody from 'koa-body';
import apiRouter from 'api';
import { SERVER_CONFIG } from 'configs';

const app = new Koa();
const router = new Router();

router.use(SERVER_CONFIG.root, apiRouter.routes(), apiRouter.allowedMethods());
app.use(koaBody(SERVER_CONFIG.body));
app.use(router.routes()).use(router.allowedMethods());

app.listen(SERVER_CONFIG.port, () => {
  console.log(`Server started on port ${SERVER_CONFIG.port}`);
});
