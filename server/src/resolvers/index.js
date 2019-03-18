const { Query } = require('./Query');
const { Subscription } = require('./Subscription');
const { auth } = require('./Mutation/auth');
const { comment } = require('./Mutation/comment');
const { AuthPayload } = require('./AuthPayload');

module.exports = {
  Query,
  Mutation: {
    ...auth,
    ...comment
  },
  Subscription,
  AuthPayload
};
