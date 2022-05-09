import { FileSizes } from 'modules/files';

const FILES_CONFIG = {
  size: {
    maximum: FileSizes.getKbFromMb(10),
  },
  delimiter: {
    initial: ',',
  },
};

export default FILES_CONFIG;
