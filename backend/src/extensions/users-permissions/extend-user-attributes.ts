export const extendUserAttributes = (originalUserAttributes) => ({
  ...originalUserAttributes,

  myBooks: {
    type: 'relation',
    relation: 'oneToMany',
    target: 'api::my-book.my-book',
    mappedBy: 'user',
  },
  myBookReleases: {
    type: 'relation',
    relation: 'oneToMany',
    target: 'api::my-book-release.my-book-release',
    mappedBy: 'user',
  },
  myFilms: {
    type: 'relation',
    relation: 'oneToMany',
    target: 'api::my-film.my-film',
    mappedBy: 'user',
  },
  myFilmReleases: {
    type: 'relation',
    relation: 'oneToMany',
    target: 'api::my-film-release.my-film-release',
    mappedBy: 'user',
  },
  myPositions: {
    type: 'relation',
    relation: 'oneToMany',
    target: 'api::my-position.my-position',
    mappedBy: 'user',
  },
});
