import _isNumber from 'lodash/fp/isNumber';
import Logger from './Logger';

const useController = async (context, controllerFn) => {
  context.data = { ...context.request.body, ...context.params, ...context.query };
  if (context.headers.authorization) {
    context.token = context.headers.authorization.split('Bearer ')[1];
  }
  try {
    logger.info(`Executing controller ${controllerFn.name}`, { tags: 'controller' });
    const result = await controllerFn(context);
    if (result) {
      if (result.status && _isNumber(result.status)) {
        context.status = result.status;
      }
      if (result.status !== 204) {
        context.body = result;
      }
    }
    return result;
  } catch (err) {
    return handleError(err, context);
  }
};

const handleError = (error, context) => {
  let message = 'Unhandled Error';
  let status = 500;
  let extra = {};

  // api errors
  if (error instanceof ApiError) {
    message = error.message;
    status = error.status;
    extra = {
      ...error.extra,
    };
  }
  // validation errors
  else if (error.message && error.message.isJoi) {
    if (_isArray(error.message.details)) {
      message = error.message.details[0].message;
      // handle custom messages
      if (error.message.details[0].type === 'override' && error.message.details[0].context) {
        error.extra = {
          errorKey: error.message.details[0].context.label,
        };
      }
    } else {
      message = JSON.stringify(error.message.details);
    }
    status = 400;
    extra = {
      ...error.extra,
      type: error.message.type,
      name: error.message.name,
    };
    error.tags = Logger.addTag(error.tags, 'validation,joi');
  }
  // stacktrace
  const env = process.env.NODE_ENV || 'local';
  if (['prod', 'dev'].includes(env)) {
    extra = {
      ...extra,
      stack: error.stack ? error.stack.split('\n') : [],
    };
  }
  Logger.error(error.message, { tags: 'error', error });

  // koa handling
  if (context) {
    context.status = status;
    context.body = {
      message,
      status,
      extra,
    };
  }
  return {
    message,
    status,
    extra,
  };
}

export { useController, handleError };
