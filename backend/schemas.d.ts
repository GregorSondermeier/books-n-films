import {
  CollectionTypeSchema,
  StringAttribute,
  RequiredAttribute,
  SetMinMaxLength,
  JSONAttribute,
  DefaultTo,
  RelationAttribute,
  DateTimeAttribute,
  PrivateAttribute,
  EmailAttribute,
  UniqueAttribute,
  PasswordAttribute,
  BooleanAttribute,
  EnumerationAttribute,
  IntegerAttribute,
  DecimalAttribute,
  SetMinMax,
  SetPluginOptions,
  TextAttribute,
  RichTextAttribute,
  UIDAttribute,
  DateAttribute,
  SingleTypeSchema,
} from '@strapi/strapi';

export interface AdminPermission extends CollectionTypeSchema {
  info: {
    name: 'Permission';
    description: '';
    singularName: 'permission';
    pluralName: 'permissions';
    displayName: 'Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: StringAttribute &
      RequiredAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }>;
    subject: StringAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }>;
    properties: JSONAttribute & DefaultTo<{}>;
    conditions: JSONAttribute & DefaultTo<[]>;
    role: RelationAttribute<'admin::permission', 'manyToOne', 'admin::role'>;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface AdminUser extends CollectionTypeSchema {
  info: {
    name: 'User';
    description: '';
    singularName: 'user';
    pluralName: 'users';
    displayName: 'User';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    firstname: StringAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }>;
    lastname: StringAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }>;
    username: StringAttribute;
    email: EmailAttribute &
      RequiredAttribute &
      PrivateAttribute &
      UniqueAttribute &
      SetMinMaxLength<{
        minLength: 6;
      }>;
    password: PasswordAttribute &
      PrivateAttribute &
      SetMinMaxLength<{
        minLength: 6;
      }>;
    resetPasswordToken: StringAttribute & PrivateAttribute;
    registrationToken: StringAttribute & PrivateAttribute;
    isActive: BooleanAttribute & PrivateAttribute & DefaultTo<false>;
    roles: RelationAttribute<'admin::user', 'manyToMany', 'admin::role'> &
      PrivateAttribute;
    blocked: BooleanAttribute & PrivateAttribute & DefaultTo<false>;
    preferedLanguage: StringAttribute;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<'admin::user', 'oneToOne', 'admin::user'> &
      PrivateAttribute;
    updatedBy: RelationAttribute<'admin::user', 'oneToOne', 'admin::user'> &
      PrivateAttribute;
  };
}

export interface AdminRole extends CollectionTypeSchema {
  info: {
    name: 'Role';
    description: '';
    singularName: 'role';
    pluralName: 'roles';
    displayName: 'Role';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: StringAttribute &
      RequiredAttribute &
      UniqueAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }>;
    code: StringAttribute &
      RequiredAttribute &
      UniqueAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }>;
    description: StringAttribute;
    users: RelationAttribute<'admin::role', 'manyToMany', 'admin::user'>;
    permissions: RelationAttribute<
      'admin::role',
      'oneToMany',
      'admin::permission'
    >;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<'admin::role', 'oneToOne', 'admin::user'> &
      PrivateAttribute;
    updatedBy: RelationAttribute<'admin::role', 'oneToOne', 'admin::user'> &
      PrivateAttribute;
  };
}

export interface AdminApiToken extends CollectionTypeSchema {
  info: {
    name: 'Api Token';
    singularName: 'api-token';
    pluralName: 'api-tokens';
    displayName: 'Api Token';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: StringAttribute &
      RequiredAttribute &
      UniqueAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }>;
    description: StringAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }> &
      DefaultTo<''>;
    type: EnumerationAttribute<['read-only', 'full-access', 'custom']> &
      RequiredAttribute &
      DefaultTo<'read-only'>;
    accessKey: StringAttribute &
      RequiredAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }>;
    lastUsedAt: DateTimeAttribute;
    permissions: RelationAttribute<
      'admin::api-token',
      'oneToMany',
      'admin::api-token-permission'
    >;
    expiresAt: DateTimeAttribute;
    lifespan: IntegerAttribute;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface AdminApiTokenPermission extends CollectionTypeSchema {
  info: {
    name: 'API Token Permission';
    description: '';
    singularName: 'api-token-permission';
    pluralName: 'api-token-permissions';
    displayName: 'API Token Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: StringAttribute &
      RequiredAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }>;
    token: RelationAttribute<
      'admin::api-token-permission',
      'manyToOne',
      'admin::api-token'
    >;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface PluginUploadFile extends CollectionTypeSchema {
  info: {
    singularName: 'file';
    pluralName: 'files';
    displayName: 'File';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: StringAttribute & RequiredAttribute;
    alternativeText: StringAttribute;
    caption: StringAttribute;
    width: IntegerAttribute;
    height: IntegerAttribute;
    formats: JSONAttribute;
    hash: StringAttribute & RequiredAttribute;
    ext: StringAttribute;
    mime: StringAttribute & RequiredAttribute;
    size: DecimalAttribute & RequiredAttribute;
    url: StringAttribute & RequiredAttribute;
    previewUrl: StringAttribute;
    provider: StringAttribute & RequiredAttribute;
    provider_metadata: JSONAttribute;
    related: RelationAttribute<'plugin::upload.file', 'morphToMany'>;
    folder: RelationAttribute<
      'plugin::upload.file',
      'manyToOne',
      'plugin::upload.folder'
    > &
      PrivateAttribute;
    folderPath: StringAttribute &
      RequiredAttribute &
      PrivateAttribute &
      SetMinMax<{
        min: 1;
      }>;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface PluginUploadFolder extends CollectionTypeSchema {
  info: {
    singularName: 'folder';
    pluralName: 'folders';
    displayName: 'Folder';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: StringAttribute &
      RequiredAttribute &
      SetMinMax<{
        min: 1;
      }>;
    pathId: IntegerAttribute & RequiredAttribute & UniqueAttribute;
    parent: RelationAttribute<
      'plugin::upload.folder',
      'manyToOne',
      'plugin::upload.folder'
    >;
    children: RelationAttribute<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.folder'
    >;
    files: RelationAttribute<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.file'
    >;
    path: StringAttribute &
      RequiredAttribute &
      SetMinMax<{
        min: 1;
      }>;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface PluginI18NLocale extends CollectionTypeSchema {
  info: {
    singularName: 'locale';
    pluralName: 'locales';
    collectionName: 'locales';
    displayName: 'Locale';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: StringAttribute &
      SetMinMax<{
        min: 1;
        max: 50;
      }>;
    code: StringAttribute & UniqueAttribute;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface PluginUsersPermissionsPermission extends CollectionTypeSchema {
  info: {
    name: 'permission';
    description: '';
    singularName: 'permission';
    pluralName: 'permissions';
    displayName: 'Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: StringAttribute & RequiredAttribute;
    role: RelationAttribute<
      'plugin::users-permissions.permission',
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface PluginUsersPermissionsRole extends CollectionTypeSchema {
  info: {
    name: 'role';
    description: '';
    singularName: 'role';
    pluralName: 'roles';
    displayName: 'Role';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: StringAttribute &
      RequiredAttribute &
      SetMinMaxLength<{
        minLength: 3;
      }>;
    description: StringAttribute;
    type: StringAttribute & UniqueAttribute;
    permissions: RelationAttribute<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.permission'
    >;
    users: RelationAttribute<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.user'
    >;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface PluginUsersPermissionsUser extends CollectionTypeSchema {
  info: {
    name: 'user';
    description: '';
    singularName: 'user';
    pluralName: 'users';
    displayName: 'User';
  };
  options: {
    draftAndPublish: false;
    timestamps: true;
  };
  attributes: {
    username: StringAttribute &
      RequiredAttribute &
      UniqueAttribute &
      SetMinMaxLength<{
        minLength: 3;
      }>;
    email: EmailAttribute &
      RequiredAttribute &
      SetMinMaxLength<{
        minLength: 6;
      }>;
    provider: StringAttribute;
    password: PasswordAttribute &
      PrivateAttribute &
      SetMinMaxLength<{
        minLength: 6;
      }>;
    resetPasswordToken: StringAttribute & PrivateAttribute;
    confirmationToken: StringAttribute & PrivateAttribute;
    confirmed: BooleanAttribute & DefaultTo<false>;
    blocked: BooleanAttribute & DefaultTo<false>;
    role: RelationAttribute<
      'plugin::users-permissions.user',
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    myBooks: RelationAttribute<
      'plugin::users-permissions.user',
      'oneToMany',
      'api::my-book.my-book'
    >;
    myBookReleases: RelationAttribute<
      'plugin::users-permissions.user',
      'oneToMany',
      'api::my-book-release.my-book-release'
    >;
    myFilms: RelationAttribute<
      'plugin::users-permissions.user',
      'oneToMany',
      'api::my-film.my-film'
    >;
    myFilmReleases: RelationAttribute<
      'plugin::users-permissions.user',
      'oneToMany',
      'api::my-film-release.my-film-release'
    >;
    myPositions: RelationAttribute<
      'plugin::users-permissions.user',
      'oneToMany',
      'api::my-position.my-position'
    >;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface ApiBookBook extends CollectionTypeSchema {
  info: {
    singularName: 'book';
    pluralName: 'books';
    displayName: 'Book';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    title: StringAttribute &
      RequiredAttribute &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    originalTitle: StringAttribute &
      SetPluginOptions<{
        i18n: {
          localized: false;
        };
      }>;
    internationalTitle: StringAttribute &
      SetPluginOptions<{
        i18n: {
          localized: false;
        };
      }>;
    synopsis: TextAttribute &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    authors: RelationAttribute<
      'api::book.book',
      'manyToMany',
      'api::person.person'
    >;
    countries: RelationAttribute<
      'api::book.book',
      'manyToMany',
      'api::country.country'
    >;
    year: StringAttribute &
      SetPluginOptions<{
        i18n: {
          localized: false;
        };
      }> &
      SetMinMaxLength<{
        minLength: 4;
        maxLength: 4;
      }>;
    genres: RelationAttribute<
      'api::book.book',
      'manyToMany',
      'api::genre.genre'
    >;
    alternativeTitles: TextAttribute &
      SetPluginOptions<{
        i18n: {
          localized: false;
        };
      }>;
    seriess: RelationAttribute<
      'api::book.book',
      'manyToMany',
      'api::book-series.book-series'
    >;
    releases: RelationAttribute<
      'api::book.book',
      'oneToMany',
      'api::book-release.book-release'
    >;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<'api::book.book', 'oneToOne', 'admin::user'> &
      PrivateAttribute;
    updatedBy: RelationAttribute<'api::book.book', 'oneToOne', 'admin::user'> &
      PrivateAttribute;
    localizations: RelationAttribute<
      'api::book.book',
      'oneToMany',
      'api::book.book'
    >;
    locale: StringAttribute;
  };
}

export interface ApiBookReleaseBookRelease extends CollectionTypeSchema {
  info: {
    singularName: 'book-release';
    pluralName: 'book-releases';
    displayName: 'BookRelease';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    medium: EnumerationAttribute<
      ['hardcover', 'paperback', 'ebook', 'audiobook', 'other', 'unknown']
    > &
      RequiredAttribute &
      SetPluginOptions<{
        i18n: {
          localized: false;
        };
      }> &
      DefaultTo<'unknown'>;
    publisher: StringAttribute &
      RequiredAttribute &
      SetPluginOptions<{
        i18n: {
          localized: false;
        };
      }>;
    country: RelationAttribute<
      'api::book-release.book-release',
      'manyToOne',
      'api::country.country'
    >;
    notes: RichTextAttribute &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    releaseCollection: RelationAttribute<
      'api::book-release.book-release',
      'manyToOne',
      'api::release-collection.release-collection'
    >;
    book: RelationAttribute<
      'api::book-release.book-release',
      'manyToOne',
      'api::book.book'
    >;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'api::book-release.book-release',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'api::book-release.book-release',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    localizations: RelationAttribute<
      'api::book-release.book-release',
      'oneToMany',
      'api::book-release.book-release'
    >;
    locale: StringAttribute;
  };
}

export interface ApiBookSeriesBookSeries extends CollectionTypeSchema {
  info: {
    singularName: 'book-series';
    pluralName: 'book-seriess';
    displayName: 'BookSeries';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    title: StringAttribute &
      RequiredAttribute &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    books: RelationAttribute<
      'api::book-series.book-series',
      'manyToMany',
      'api::book.book'
    >;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'api::book-series.book-series',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'api::book-series.book-series',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    localizations: RelationAttribute<
      'api::book-series.book-series',
      'oneToMany',
      'api::book-series.book-series'
    >;
    locale: StringAttribute;
  };
}

export interface ApiCountryCountry extends CollectionTypeSchema {
  info: {
    singularName: 'country';
    pluralName: 'countries';
    displayName: 'Country';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    films: RelationAttribute<
      'api::country.country',
      'manyToMany',
      'api::film.film'
    >;
    books: RelationAttribute<
      'api::country.country',
      'manyToMany',
      'api::book.book'
    >;
    filmReleases: RelationAttribute<
      'api::country.country',
      'oneToMany',
      'api::film-release.film-release'
    >;
    alpha2Code: StringAttribute &
      RequiredAttribute &
      SetMinMaxLength<{
        minLength: 2;
        maxLength: 2;
      }>;
    alpha3Code: StringAttribute &
      RequiredAttribute &
      SetMinMaxLength<{
        minLength: 3;
        maxLength: 3;
      }>;
    bookReleases: RelationAttribute<
      'api::country.country',
      'oneToMany',
      'api::book-release.book-release'
    >;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'api::country.country',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'api::country.country',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface ApiFilmFilm extends CollectionTypeSchema {
  info: {
    singularName: 'film';
    pluralName: 'films';
    displayName: 'Film';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    title: StringAttribute &
      RequiredAttribute &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    originalTitle: StringAttribute &
      SetPluginOptions<{
        i18n: {
          localized: false;
        };
      }>;
    internationalTitle: StringAttribute &
      SetPluginOptions<{
        i18n: {
          localized: false;
        };
      }>;
    synopsis: TextAttribute &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    directors: RelationAttribute<
      'api::film.film',
      'manyToMany',
      'api::person.person'
    >;
    actors: RelationAttribute<
      'api::film.film',
      'manyToMany',
      'api::person.person'
    >;
    producers: RelationAttribute<
      'api::film.film',
      'manyToMany',
      'api::person.person'
    >;
    productionStudios: RelationAttribute<
      'api::film.film',
      'manyToMany',
      'api::studio.studio'
    >;
    countries: RelationAttribute<
      'api::film.film',
      'manyToMany',
      'api::country.country'
    >;
    distributionStudios: RelationAttribute<
      'api::film.film',
      'manyToMany',
      'api::studio.studio'
    >;
    year: StringAttribute &
      SetPluginOptions<{
        i18n: {
          localized: false;
        };
      }> &
      SetMinMaxLength<{
        minLength: 4;
        maxLength: 4;
      }>;
    alternativeTitles: TextAttribute &
      SetPluginOptions<{
        i18n: {
          localized: false;
        };
      }>;
    seriess: RelationAttribute<
      'api::film.film',
      'manyToMany',
      'api::film-series.film-series'
    >;
    genres: RelationAttribute<
      'api::film.film',
      'manyToMany',
      'api::genre.genre'
    >;
    releases: RelationAttribute<
      'api::film.film',
      'oneToMany',
      'api::film-release.film-release'
    >;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<'api::film.film', 'oneToOne', 'admin::user'> &
      PrivateAttribute;
    updatedBy: RelationAttribute<'api::film.film', 'oneToOne', 'admin::user'> &
      PrivateAttribute;
    localizations: RelationAttribute<
      'api::film.film',
      'oneToMany',
      'api::film.film'
    >;
    locale: StringAttribute;
  };
}

export interface ApiFilmReleaseFilmRelease extends CollectionTypeSchema {
  info: {
    singularName: 'film-release';
    pluralName: 'film-releases';
    displayName: 'FilmRelease';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    medium: EnumerationAttribute<
      [
        'uhdbluray',
        'bluray',
        'hddvd',
        'dvd',
        'tv',
        'vod',
        'ld',
        'vcd',
        'vhs',
        'other',
        'unknown'
      ]
    > &
      RequiredAttribute &
      SetPluginOptions<{
        i18n: {
          localized: false;
        };
      }> &
      DefaultTo<'unknown'>;
    label: StringAttribute &
      RequiredAttribute &
      SetPluginOptions<{
        i18n: {
          localized: false;
        };
      }>;
    country: RelationAttribute<
      'api::film-release.film-release',
      'manyToOne',
      'api::country.country'
    >;
    notes: RichTextAttribute &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    packaging: EnumerationAttribute<
      [
        'softcase',
        'digipack',
        'hardbox',
        'insert',
        'metalpak',
        'mediabook',
        'steelbook',
        'tinbox',
        'other',
        'unknown'
      ]
    > &
      RequiredAttribute &
      SetPluginOptions<{
        i18n: {
          localized: false;
        };
      }> &
      DefaultTo<'unknown'>;
    edition: StringAttribute &
      SetPluginOptions<{
        i18n: {
          localized: false;
        };
      }>;
    releaseCollection: RelationAttribute<
      'api::film-release.film-release',
      'manyToOne',
      'api::release-collection.release-collection'
    >;
    film: RelationAttribute<
      'api::film-release.film-release',
      'manyToOne',
      'api::film.film'
    >;
    rating: RelationAttribute<
      'api::film-release.film-release',
      'manyToOne',
      'api::rating.rating'
    >;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'api::film-release.film-release',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'api::film-release.film-release',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    localizations: RelationAttribute<
      'api::film-release.film-release',
      'oneToMany',
      'api::film-release.film-release'
    >;
    locale: StringAttribute;
  };
}

export interface ApiFilmSeriesFilmSeries extends CollectionTypeSchema {
  info: {
    singularName: 'film-series';
    pluralName: 'film-seriess';
    displayName: 'FilmSeries';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    title: StringAttribute &
      RequiredAttribute &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    films: RelationAttribute<
      'api::film-series.film-series',
      'manyToMany',
      'api::film.film'
    >;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'api::film-series.film-series',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'api::film-series.film-series',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    localizations: RelationAttribute<
      'api::film-series.film-series',
      'oneToMany',
      'api::film-series.film-series'
    >;
    locale: StringAttribute;
  };
}

export interface ApiGenreGenre extends CollectionTypeSchema {
  info: {
    singularName: 'genre';
    pluralName: 'genres';
    displayName: 'Genre';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    title: StringAttribute & RequiredAttribute & UniqueAttribute;
    slug: UIDAttribute<'api::genre.genre', 'title'> & RequiredAttribute;
    books: RelationAttribute<
      'api::genre.genre',
      'manyToMany',
      'api::book.book'
    >;
    films: RelationAttribute<
      'api::genre.genre',
      'manyToMany',
      'api::film.film'
    >;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'api::genre.genre',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'api::genre.genre',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface ApiMyBookMyBook extends CollectionTypeSchema {
  info: {
    singularName: 'my-book';
    pluralName: 'my-books';
    displayName: 'MyBook';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    book: RelationAttribute<
      'api::my-book.my-book',
      'oneToOne',
      'api::book.book'
    >;
    didRead: BooleanAttribute & DefaultTo<false>;
    wantToWatch: BooleanAttribute & DefaultTo<false>;
    position: RelationAttribute<
      'api::my-book.my-book',
      'oneToOne',
      'api::my-position.my-position'
    >;
    user: RelationAttribute<
      'api::my-book.my-book',
      'manyToOne',
      'plugin::users-permissions.user'
    >;
    addedAt: DateAttribute;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'api::my-book.my-book',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'api::my-book.my-book',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface ApiMyBookReleaseMyBookRelease extends CollectionTypeSchema {
  info: {
    singularName: 'my-book-release';
    pluralName: 'my-book-releases';
    displayName: 'MyBookRelease';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    bookRelease: RelationAttribute<
      'api::my-book-release.my-book-release',
      'oneToOne',
      'api::book-release.book-release'
    >;
    buyingPrice: DecimalAttribute;
    currentValue: DecimalAttribute;
    didRead: BooleanAttribute & DefaultTo<false>;
    wantToRead: BooleanAttribute & DefaultTo<false>;
    user: RelationAttribute<
      'api::my-book-release.my-book-release',
      'manyToOne',
      'plugin::users-permissions.user'
    >;
    addedAt: DateAttribute;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'api::my-book-release.my-book-release',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'api::my-book-release.my-book-release',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface ApiMyFilmMyFilm extends CollectionTypeSchema {
  info: {
    singularName: 'my-film';
    pluralName: 'my-films';
    displayName: 'MyFilm';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    film: RelationAttribute<
      'api::my-film.my-film',
      'oneToOne',
      'api::film.film'
    >;
    didWatch: BooleanAttribute & DefaultTo<false>;
    wantToWatch: BooleanAttribute & DefaultTo<false>;
    position: RelationAttribute<
      'api::my-film.my-film',
      'oneToOne',
      'api::my-position.my-position'
    >;
    user: RelationAttribute<
      'api::my-film.my-film',
      'manyToOne',
      'plugin::users-permissions.user'
    >;
    addedAt: DateAttribute;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'api::my-film.my-film',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'api::my-film.my-film',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface ApiMyFilmReleaseMyFilmRelease extends CollectionTypeSchema {
  info: {
    singularName: 'my-film-release';
    pluralName: 'my-film-releases';
    displayName: 'MyFilmRelease';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    filmRelease: RelationAttribute<
      'api::my-film-release.my-film-release',
      'oneToOne',
      'api::film-release.film-release'
    >;
    buyingPrice: DecimalAttribute;
    currentValue: DecimalAttribute;
    didWatch: BooleanAttribute & DefaultTo<false>;
    wantToWatch: BooleanAttribute & DefaultTo<false>;
    position: RelationAttribute<
      'api::my-film-release.my-film-release',
      'oneToOne',
      'api::my-position.my-position'
    >;
    user: RelationAttribute<
      'api::my-film-release.my-film-release',
      'manyToOne',
      'plugin::users-permissions.user'
    >;
    addedAt: DateAttribute;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'api::my-film-release.my-film-release',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'api::my-film-release.my-film-release',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface ApiMyPositionMyPosition extends CollectionTypeSchema {
  info: {
    singularName: 'my-position';
    pluralName: 'my-positions';
    displayName: 'MyPosition';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    title: StringAttribute & RequiredAttribute;
    user: RelationAttribute<
      'api::my-position.my-position',
      'manyToOne',
      'plugin::users-permissions.user'
    >;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'api::my-position.my-position',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'api::my-position.my-position',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface ApiPersonPerson extends CollectionTypeSchema {
  info: {
    singularName: 'person';
    pluralName: 'people';
    displayName: 'Person';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    displayName: StringAttribute & RequiredAttribute;
    firstName: StringAttribute;
    familyName: StringAttribute;
    directedFilms: RelationAttribute<
      'api::person.person',
      'manyToMany',
      'api::film.film'
    >;
    actedFilms: RelationAttribute<
      'api::person.person',
      'manyToMany',
      'api::film.film'
    >;
    producedFilms: RelationAttribute<
      'api::person.person',
      'manyToMany',
      'api::film.film'
    >;
    writtenBooks: RelationAttribute<
      'api::person.person',
      'manyToMany',
      'api::book.book'
    >;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'api::person.person',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'api::person.person',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface ApiRatingRating extends CollectionTypeSchema {
  info: {
    singularName: 'rating';
    pluralName: 'ratings';
    displayName: 'Rating';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    title: StringAttribute & RequiredAttribute & UniqueAttribute;
    filmReleases: RelationAttribute<
      'api::rating.rating',
      'oneToMany',
      'api::film-release.film-release'
    >;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'api::rating.rating',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'api::rating.rating',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface ApiReleaseCollectionReleaseCollection
  extends CollectionTypeSchema {
  info: {
    singularName: 'release-collection';
    pluralName: 'release-collections';
    displayName: 'ReleaseCollection';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    title: StringAttribute & RequiredAttribute;
    bookReleases: RelationAttribute<
      'api::release-collection.release-collection',
      'oneToMany',
      'api::book-release.book-release'
    >;
    filmReleases: RelationAttribute<
      'api::release-collection.release-collection',
      'oneToMany',
      'api::film-release.film-release'
    >;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'api::release-collection.release-collection',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'api::release-collection.release-collection',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface ApiStudioStudio extends CollectionTypeSchema {
  info: {
    singularName: 'studio';
    pluralName: 'studios';
    displayName: 'Studio';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    displayName: StringAttribute & RequiredAttribute;
    producedFilms: RelationAttribute<
      'api::studio.studio',
      'manyToMany',
      'api::film.film'
    >;
    distributedFilms: RelationAttribute<
      'api::studio.studio',
      'manyToMany',
      'api::film.film'
    >;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'api::studio.studio',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'api::studio.studio',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface ApiTranslationTranslation extends SingleTypeSchema {
  info: {
    singularName: 'translation';
    pluralName: 'translations';
    displayName: 'Translation';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    bookReleaseMedium: JSONAttribute &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    filmReleaseMedium: JSONAttribute &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    filmReleasePackaging: JSONAttribute &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'api::translation.translation',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'api::translation.translation',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    localizations: RelationAttribute<
      'api::translation.translation',
      'oneToMany',
      'api::translation.translation'
    >;
    locale: StringAttribute;
  };
}

declare global {
  namespace Strapi {
    interface Schemas {
      'admin::permission': AdminPermission;
      'admin::user': AdminUser;
      'admin::role': AdminRole;
      'admin::api-token': AdminApiToken;
      'admin::api-token-permission': AdminApiTokenPermission;
      'plugin::upload.file': PluginUploadFile;
      'plugin::upload.folder': PluginUploadFolder;
      'plugin::i18n.locale': PluginI18NLocale;
      'plugin::users-permissions.permission': PluginUsersPermissionsPermission;
      'plugin::users-permissions.role': PluginUsersPermissionsRole;
      'plugin::users-permissions.user': PluginUsersPermissionsUser;
      'api::book.book': ApiBookBook;
      'api::book-release.book-release': ApiBookReleaseBookRelease;
      'api::book-series.book-series': ApiBookSeriesBookSeries;
      'api::country.country': ApiCountryCountry;
      'api::film.film': ApiFilmFilm;
      'api::film-release.film-release': ApiFilmReleaseFilmRelease;
      'api::film-series.film-series': ApiFilmSeriesFilmSeries;
      'api::genre.genre': ApiGenreGenre;
      'api::my-book.my-book': ApiMyBookMyBook;
      'api::my-book-release.my-book-release': ApiMyBookReleaseMyBookRelease;
      'api::my-film.my-film': ApiMyFilmMyFilm;
      'api::my-film-release.my-film-release': ApiMyFilmReleaseMyFilmRelease;
      'api::my-position.my-position': ApiMyPositionMyPosition;
      'api::person.person': ApiPersonPerson;
      'api::rating.rating': ApiRatingRating;
      'api::release-collection.release-collection': ApiReleaseCollectionReleaseCollection;
      'api::studio.studio': ApiStudioStudio;
      'api::translation.translation': ApiTranslationTranslation;
    }
  }
}
