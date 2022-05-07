import { FileSizes } from 'modules/files';

export const FILE_CONFIG = {
  SIZE: {
    maximum: FileSizes.getKbFromMb(10),
  },
  DELIMITER: {
    initial: ',',
  },
};

export const DATA_CONFIG = {
  FEATURES: {
    minimumNumber: 1,
    maximumNumber: 10,
  },
  VALUES: {
    maximumNumber: 1,
  },
};

export const GRADIENT_CONFIG = {
  ITERATIONS: {
    minimumNumber: 1,
    initialNumber: 1000,
    maximumNumber: 10000,
  },
  LEARNING_RATE: {
    minimum: 0.0001,
    maximum: 10,
  },
};

export const COST_CONFIG = {
  LEARINGIN_RATE: {
    minimum: 0.001,
    maximum: 10,
  },
};
