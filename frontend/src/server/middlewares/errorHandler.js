import logger from '../utils/logger';

export default function errorHandler(err, {}, res, {}) {
  logger.error(err);

  if (res.headersSent) {
    res.end();
  } else {
    res.status(500).send('Internal server error.');
  }
}
