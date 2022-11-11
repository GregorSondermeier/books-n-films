/**
 * my-book-release router
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::my-book-release.my-book-release', {
  only: ['find', 'findOne', 'create', 'update', 'delete'],
  config: {
    find: {
      middlewares: [
        'global::user-content',
      ],
    },
    findOne: {
      middlewares: [
        'global::user-content',
      ],
    },
    create: {
      middlewares: [
        'global::user-content',
      ],
    },
    update: {
      middlewares: [
        'global::user-content',
      ],
    },
    delete: {
      middlewares: [
        'global::user-content',
      ],
    },
  },
});
