import { find as _find } from 'lodash';

const fieldSelectionAndPopulation = (ctx, next) => {
  delete ctx.query.populate;

  ctx.query.fields = ['id', 'username'];

  return next();
};

export const extendUserFindMiddlewares = (userRoutes) => {
  const findUsersRoute = _find(userRoutes, {
    handler: 'user.find',
  });

  if (findUsersRoute) {
    findUsersRoute.config.middlewares = findUsersRoute.config.middlewares
      ? [...findUsersRoute.config.middlewares, fieldSelectionAndPopulation]
      : [fieldSelectionAndPopulation];
  }

  return userRoutes;
};
