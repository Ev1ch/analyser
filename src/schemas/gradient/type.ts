interface IGradientOptions {
  initialTheta?: number[] | number;
  iterationsNumber?: number;
  learningRate?: number;
  shouldNormalize?: boolean;
  normalizingRate?: number;
}

export default IGradientOptions;
