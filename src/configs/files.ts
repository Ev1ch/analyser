import { FileSizes } from 'modules/files';

const FILES_CONFIG = {
  size: {
    maximum: FileSizes.getKbFromMb(10),
  },
  delimiter: {
    initial: ',',
  },
  extentions: ['csv'],
};

export default FILES_CONFIG;
