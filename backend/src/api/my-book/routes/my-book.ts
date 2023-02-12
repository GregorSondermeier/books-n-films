import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::my-book.my-book', {
  config: {
    find: {
      middlewares: ['global::filter-by-user'],
    },
    findOne: {
      policies: ['global::belongs-to-user'],
    },
    create: {
      middlewares: ['global::set-user'],
    },
    update: {
      policies: ['global::belongs-to-user'],
    },
    delete: {
      policies: ['global::belongs-to-user'],
    },
  },
});
