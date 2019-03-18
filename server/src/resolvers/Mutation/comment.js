const { getUserId } = require('../../utils');

const comment = {
  async createComment(
    parent,
    { message, isPublic, parentCommentId },
    ctx,
    info
  ) {
    const userId = getUserId(ctx);

    const parentConnect = parentCommentId
      ? {
          connect: { id: parentCommentId }
        }
      : {};

    return ctx.db.mutation.createComment(
      {
        data: {
          message,
          isPublic,
          parent: parentConnect,
          author: { connect: { id: userId } }
        }
      },
      info
    );
  },

  async editComment(parent, { id, message, isPublic }, ctx, info) {
    const userId = getUserId(ctx);

    const postExists = await ctx.db.exists.Comment({
      id,
      author: { id: userId }
    });
    if (!postExists) {
      throw new Error(`Post not found or you're not the author`);
    }

    let data = {};

    if (message) {
      data.message = message;
    }

    if (isPublic) {
      data.isPublic = isPublic;
    }

    return ctx.db.mutation.updateComment({ where: { id }, data }, info);
  },

  async deleteComment(parent, { id }, ctx, info) {
    const userId = getUserId(ctx);
    const commentExists = await ctx.db.exists.Comment({
      id,
      author: { id: userId }
    });
    if (!commentExists) {
      throw new Error(`Comment not found or you're not the author`);
    }

    return ctx.db.mutation.deleteComment({ where: { id } });
  }
};

module.exports = { comment };
