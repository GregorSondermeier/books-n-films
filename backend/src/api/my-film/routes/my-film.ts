/**
 * my-film router
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::my-film.my-film', {
  config: {
    find: {
      middlewares: ['global::filter-by-user'],
    },
    findOne: {
      policies: ['global::belongs-to-user'],
    },
    create: {
      // @todo write a middleware that adds the user from context into the entity
    },
    update: {
      policies: ['global::belongs-to-user'],
    },
    delete: {
      policies: ['global::belongs-to-user'],
    },
  },
});
