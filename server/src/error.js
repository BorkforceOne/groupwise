const _exports = {};

class AppError extends Error {
  constructor(message, type, status=null) {
    super(message);
    this.message = message;
    this.type = type;
    this.status = status;
  }
}
_exports.AppError = AppError;

const AppErrorTypes = {};
_exports.AppErrorTypes = AppErrorTypes;

AppErrorTypes['NOT_FOUND'] = 'NOT_FOUND';
AppErrorTypes['MAP_NULL_INSTANCE'] = 'MAP_NULL_INSTANCE';
AppErrorTypes['OTHER'] = 'OTHER';

module.exports = _exports;
