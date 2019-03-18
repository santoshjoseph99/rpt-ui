const jwt = require('jsonwebtoken');

function getUserId(ctx, optional = false) {
  const Authorization = ctx.request.get('Authorization');
  if (Authorization) {
    const token = Authorization.replace('Bearer ', '');
    const { userId } = jwt.verify(token, process.env.APP_SECRET);
    return userId;
  }

  if (!optional) {
    throw new AuthError();
  }

  return -1;
}

function getUserIdOptional(ctx) {
  return getUserId(ctx, true);
}

class AuthError extends Error {
  constructor() {
    super('Not authorized');
  }
}

module.exports = {
  getUserId,
  getUserIdOptional,
  AuthError
};
