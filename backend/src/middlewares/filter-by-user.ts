import { merge as _merge } from 'lodash';

/**
 * This 'global::filter-by-user' middleware is designed to be used for the API 'find' routes for collection types
 * beginning with 'my':
 * my-book
 * my-book-release
 * my-film
 * my-film-release
 * my position
 *
 * It adds a filter to only return content for the current user so that User A does not see content for user B.
 * This requires that the associated content-type has a relation to "User".
 *
 * @example:
 *   * user A owns my-book A
 *   * user B owns my-book B
 *   * user A can only find my-book A
 *   * user A can never find my-book B
 *
 * @usage:
 *   // for core routers:
 *   export default factories.createCoreRouter(contentTypeUid, {
 *     config: {
 *       find: {
 *         middlewares: ['global::filter-by-user'],
 *       },
 *     },
 *   });
 *
 *   // for custom routers:
 *   export default {
 *     routes: [
 *       {
 *         method: 'GET,
 *         path: '/todos',
 *         handler: 'todo.find',
 *         config: {
 *           middlewares: [
 *             {
 *               name: 'global::filter-by-user'
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
export default (config: MiddlewareConfig) =>
  async (ctx: MiddlewareContext, next) => {
    const userId = ctx.state.user.id;
    if (!userId) {
      strapi.log.warn(
        `global::belongs-to-user policy detected no user. It can only work with 'Authenticated' requests.`,
      );

      return;
    }

    const userRelationName = config.userRelationName || 'user';

    ctx.query.filters = _merge(ctx.query.filters || {}, {
      [userRelationName]: { id: userId },
    });

    await next();
  };

interface MiddlewareContext {
  query: {
    filters?: Record<string, string | object>;
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
