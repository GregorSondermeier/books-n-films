import { merge as _merge } from 'lodash';

/**
 * This 'global::user-content' middleware is designed to be used for the API routes for collection types beginning with my:
 * my-book
 * my-book-release
 * my-film
 * my-film-release
 * my position
 *
 * It adds a filter to only return content for the current user so that User A does not see content for user B.
 * This requires that the associated content-type has a relation to "User" in the "user" field.
 */
export default () => async (ctx, next) => {
  const userId = ctx.state.user.id;

  ctx.query.filters = _merge(ctx.query.filters || {}, { user: { id: userId } });

  await next();
};
