export interface IFileOptions {
  delimiter?: string;
}

export interface IDataOptions {
  x: number[];
  y: number;
  shouldNormalize?: boolean;
}
export interface ICostOptions {
  normalizingRate?: number;
  shouldNormalize?: boolean;
}

export interface IGradientOptions {
  initialTheta?: number[] | number;
  iterationsNumber?: number;
  learningRate?: number;
  shouldNormalize?: boolean;
  normalizingRate?: number;
}

export interface IAnalysisOptions {
  file?: IFileOptions;
  data: IDataOptions;
  gradient?: IGradientOptions;
  cost?: ICostOptions;
}
