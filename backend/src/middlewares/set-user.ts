/**
 * This 'global::set-user' middleware is designed to be used for the API 'create' route for collection
 * types beginning with 'my':
 * my-book
 * my-book-release
 * my-film
 * my-film-release
 * my position
 *
 * It sets the relation to the current user so that User A creates content for himself.
 * It also eliminates the necessity for the client to set the user relation manually.
 * This requires that the associated content-type has a relation to "User".
 *
 * @example:
 *   * when user A creates a my-book via the REST API, it is automatically related to himself
 *   * user B is not able to create a my-book for user A
 *
 * @usage:
 *   // for core routers:
 *   export default factories.createCoreRouter(contentTypeUid, {
 *     config: {
 *       create: {
 *         middlewares: ['global::set-user'],
 *       },
 *     },
 *   });
 *
 *   // for custom routers:
 *   export default {
 *     routes: [
 *       {
 *         method: 'POST,
 *         path: '/todos',
 *         handler: 'todo.create',
 *         config: {
 *           middlewares: [
 *             {
 *               name: 'global::set-user'
 *               config: {
 *                 userRelationName: 'assignee',
 *               },
 *             },
 *           ],
 *         },
 *       },
 *     ],
 *   };
 */
export default (config: MiddlewareConfig) => {
  return async (ctx: MiddlewareContext, next) => {
    const userId = ctx.state.user.id;
    if (!userId) {
      strapi.log.warn(
        `global::set-user policy detected no user. It can only work with 'Authenticated' requests.`,
      );

      return;
    }

    const userRelationName = config.userRelationName || 'user';

    if (ctx.request.body.data) {
      ctx.request.body.data[userRelationName] = userId;
    } else {
      strapi.log.warn(
        `global::set-user policy detected no 'data' property in request body.`,
      );
    }

    await next();
  };
};

interface MiddlewareContext {
  request: {
    body?: {
      data: Record<string, unknown>;
    };
  };
  state: {
    user: {
      id: string;
    };
  };
}

interface MiddlewareConfig {
  userRelationName?: string;
}
