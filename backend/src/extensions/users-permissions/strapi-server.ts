import { extendUserAttributes } from './extend-user-attributes';

module.exports = (plugin) => {
  plugin.contentTypes.user.schema.attributes = extendUserAttributes(
    plugin.contentTypes.user.schema.attributes,
  );

  return plugin;
};
