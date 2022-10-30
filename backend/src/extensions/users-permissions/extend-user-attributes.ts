export const extendUserAttributes = (originalUserAttributes) => ({
  ...originalUserAttributes,

  myBooks: {
    type: 'relation',
    relation: 'oneToMany',
    target: 'api::my-book.my-book',
    mappedBy: 'user'
  },
  myBookVersions: {
    type: 'relation',
    relation: 'oneToMany',
    target: 'api::my-book-version.my-book-version',
    mappedBy: 'user'
  },
  myFilms: {
    type: 'relation',
    relation: 'oneToMany',
    target: 'api::my-film.my-film',
    mappedBy: 'user'
  },
  myFilmVersions: {
    type: 'relation',
    relation: 'oneToMany',
    target: 'api::my-film-version.my-film-version',
    mappedBy: 'user'
  },
  myPositions: {
    type: 'relation',
    relation: 'oneToMany',
    target: 'api::my-position.my-position',
    mappedBy: 'user'
  }
});
