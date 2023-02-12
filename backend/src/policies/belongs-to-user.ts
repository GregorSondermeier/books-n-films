import { Strapi } from '@strapi/strapi';
import { PolicyContext as StrapiPolicyContext } from '@strapi/strapi/lib/core/registries/policies';
import { errors } from '@strapi/utils';

/**
 * This 'global::belongs-to-user' policy is designed to be used for the API routes for collection types beginning with my:
 * my-book
 * my-book-release
 * my-film
 * my-film-release
 * my position
 *
 * It makes sure that update and delete requests to these content types is only possible if the user owns that entity.
 * This requires that the associated content-type has a relation to "User" in the "user" field.
 *
 * @example:
 *   * user A owns my-book A
 *   * user B owns my-book B
 *   * user A can update and delete my-book A
 *   * user A can not update and delete my-book B
 *   * user B can update and delete my-book B
 *   * user B can not update and delete my-book A
 *
 * @usage:
 *   // for core routers:
 *   export default factories.createCoreRouter(contentTypeUid, {
 *     config: {
 *       findOne: {
 *         policies: ['global::belongs-to-user'],
 *       },
 *       update: {
 *         policies: ['global::belongs-to-user'],
 *       },
 *       delete: {
 *         policies: ['global::belongs-to-user'],
 *       },
 *     },
 *   });
 *
 *   // for custom routers:
 *   export default {
 *     routes: [
 *       {
 *         method: 'GET,
 *         path: '/todos/:todoId',
 *         handler: 'todo.findOne',
 *         config: {
 *           policies: [
 *             {
 *               name: 'global::belongs-to-user'
 *               config: {
 *                 contentTypeUid: 'api::todo.todo',
 *                 idParamName: 'todoId',
 *                 userRelationName: 'assignee',
 *               },
 *             },
 *           ],
 *         },
 *       },
 *     ],
 *   };
 */
export default async (
  ctx: PolicyContext,
  config: PolicyConfig,
  { strapi }: { strapi: Strapi },
) => {
  const userId = ctx.state.user.id;
  if (!userId) {
    strapi.log.warn(
      `global::belongs-to-user policy detected no user. It can only work with 'Authenticated' requests.`,
    );

    return true;
  }

  const idParamName = config.idParamName || 'id';
  const userRelationName = config.userRelationName || 'user';
  const contentTypeUid =
    config.contentTypeUid || detectContentTypeUid(ctx.state.route.handler);
  if (!contentTypeUid) {
    strapi.log.warn(
      'global::belongs-to-user policy was not able to detect the contentTypeUid from the route handler.',
    );

    return true;
  }

  if (!strapi.contentType(contentTypeUid)) {
    strapi.log.warn(
      `global::belongs-to-user policy detected contentTypeUid ${contentTypeUid} from the route handler but it does not exist.`,
    );

    return true;
  }

  const entityId = ctx.params[idParamName];
  if (!entityId) {
    strapi.log.warn(
      `global::belongs-to-user policy was unable to detect a route param called '${idParamName}'.`,
    );

    return true;
  }

  const entityCount = await strapi.entityService.count(contentTypeUid, {
    filters: {
      id: entityId,
      [userRelationName]: { id: userId },
    },
  });

  if (entityCount) {
    return true;
  }

  throw new errors.ForbiddenError();
};

/**
 * @example:
 *   * 'api::todo.todo.find' => 'api::todo.todo'
 */
const detectContentTypeUid = (routeHandler: string): string | undefined => {
  const regex = /\w+::[\w-]+\.[\w-]+/;
  const matches = routeHandler.match(regex);

  return matches ? matches[0] : undefined;
};

type PolicyContext = StrapiPolicyContext & {
  params: Record<string, string>;
  state: {
    route: {
      handler: string;
    };
    user: {
      id: string;
    };
  };
};

interface PolicyConfig {
  contentTypeUid?: string;
  idParamName?: string;
  userRelationName?: string;
}
