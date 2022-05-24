const GRADIENT_CONFIG = {
  theta: {
    minimum: 0,
    initial: 0,
    maximum: 10,
  },
  iterations: {
    minimumNumber: 1,
    initialNumber: 1000,
    maximumNumber: 10000,
  },
  learningRate: {
    minimum: 0.001,
    initial: 0.01,
    maximum: 1,
  },
  normalizingRate: {
    minimum: 0.001,
    initial: 0.01,
    maximum: 1,
  },
};

export default GRADIENT_CONFIG;
