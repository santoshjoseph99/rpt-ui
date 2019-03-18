const Subscription = {
  feedSubscription: {
    subscribe: (parent, args, ctx, info) => {
      // TODO: handle authenticated subscriptions
      return ctx.db.subscription.comment(
        {
          where: {
            node: {
              isPublic: true
            }
          }
        },
        info
      );
    }
  }
};

module.exports = { Subscription };
