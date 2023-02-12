import { extendUserAttributes } from './extend-user-attributes';
import { extendUserFindMiddlewares } from './extend-user-route-find-middlewares';

module.exports = (plugin) => {
  plugin.contentTypes.user.schema.attributes = extendUserAttributes(
    plugin.contentTypes.user.schema.attributes,
  );

  plugin.routes['content-api'].routes = extendUserFindMiddlewares(
    plugin.routes['content-api'].routes,
  );

  return plugin;
};
