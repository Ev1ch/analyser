import Router from 'koa-router';
import analysisRouter from './analysis';

const Routes = {
  ANALYSIS: '/analysis',
};

const router = new Router();

router.use(
  Routes.ANALYSIS,
  analysisRouter.routes(),
  analysisRouter.allowedMethods(),
);

export default router;
