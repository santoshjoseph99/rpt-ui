const { getUserId, getUserIdOptional, AuthError } = require('../utils');

const Query = {
  feed(parent, args, ctx, info) {
    const userId = getUserIdOptional(ctx);

    const where =
      userId === -1
        ? { AND: [{ isPublic: true }, { parent: null }] }
        : { parent: null };

    return ctx.db.query.comments(
      {
        where,
        orderBy: 'createdAt_DESC'
      },
      info
    );
  },

  async comment(parent, { id }, ctx, info) {
    const userId = getUserIdOptional(ctx);

    if (userId === -1) {
      // NOTE: hack given unique constraint query for `comment(id)`
      const canView = await ctx.db.exists.Comment({ id, isPublic: true });

      if (!canView) {
        throw new AuthError();
      }
    }

    return ctx.db.query.comment({ where: { id } }, info);
  },

  me(parent, args, ctx, info) {
    const id = getUserId(ctx);
    return ctx.db.query.user({ where: { id } }, info);
  }
};

module.exports = { Query };
