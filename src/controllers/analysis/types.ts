export interface IAnalysisOptions {
  data: {
    x: number[];
    y: number;
  };
  gradient: {
    iterationsNumber: number;
    learningRate: number;
  };
}
