import { createLogger, format } from 'winston';
const { combine, timestamp, prettyPrint } = format;

// more details in dev
const env = process.env.NODE_ENV || 'local';
const level = ['prod', 'dev'].includes(env) ? 'info' : 'debug';

const winstonLogger = createLogger({
  level,
  format: combine(timestamp(), prettyPrint()),
  transports: [
    new winston.transports.Console()
  ],
});

// turned off in test
winstonLogger.transports[0].silent = process.env.LOGS_DISABLED;

// helpers
const addTag = (tags, newTag) => {
  tags = tags || '';
  tags += tags.length ? `,${newTag}` : newTag;
  return tags;
};
const transformLogDetails = (extra) => {
  let result = {
    ...extra,
  };
  if (result.status >= 500) {
    result.tags = addTag(result.tags, 'unhandledExcaption');
  } else if (result.status >= 400) {
    result.tags = addTag(result.tags, 'apiError');
  }
  return result;
};

export default {
  debug: (message, extra = {}) => winstonLogger.debug(message, transformLogDetails(extra)),
  log: (message, extra = {}) => winstonLogger.info(message, transformLogDetails(extra)),
  info: (message, extra = {}) => winstonLogger.info(message, transformLogDetails(extra)),
  warn: (message, extra = {}) => winstonLogger.warn(message, transformLogDetails(extra)),
  error: (message, extra = {}) => winstonLogger.error(message, transformLogDetails(extra)),
  addTag,
};
