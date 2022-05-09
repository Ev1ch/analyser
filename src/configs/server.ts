import 'dotenv/config';

const SERVER_CONFIG = {
  port: process.env.PORT || 3000,
  root: '/api',
  body: {
    multipart: true,
    urlencoded: true,
  },
};

export default SERVER_CONFIG;
