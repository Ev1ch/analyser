import Router from 'koa-router';
import { AnalysisController } from 'controllers';

const AnalysisRoutes = {
  ROOT: '/',
};

const router = new Router();
const analysisController = new AnalysisController();

router.post(
  AnalysisRoutes.ROOT,
  analysisController.getAnalysis.bind(analysisController),
);

export default router;
