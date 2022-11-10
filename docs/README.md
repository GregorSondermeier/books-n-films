# books-n-films documentation

## ER diagram

![ER diagram](assets/er.svg)

## REST API

### Login

POST `/api/auth/local`

Payload:
```
{
  "identifier": "<email>",
  "password": "<password>"
}
```

Response:  
```
{
  "jwt": "<jwt>",
  "user": "<User>"
}
```

For more Details see
[Strapi documentation](https://docs.strapi.io/developer-docs/latest/guides/auth-request.html).

### Content

For detailed documentation about REST API possibilities see
[Strapi documentation](https://docs.strapi.io/developer-docs/latest/developer-resources/database-apis-reference/rest-api.html).

There you will also find how to
[filter](https://docs.strapi.io/developer-docs/latest/developer-resources/database-apis-reference/rest/filtering-locale-publication.html),
[populate and select fields](https://docs.strapi.io/developer-docs/latest/developer-resources/database-apis-reference/rest/populating-fields.html),
[sort and paginate](https://docs.strapi.io/developer-docs/latest/developer-resources/database-apis-reference/rest/sort-pagination.html).

**Note:**  
[strapi-plugin-transformer](https://market.strapi.io/plugins/strapi-plugin-transformer)
is used to reduce the depth of API responses. There are no `data` and
`attributes` fields in the REST API's responses.

#### Public APIs

`/api/books`  
`/api/book-seriess`  
`/api/book-releases`  
`/api/countries`  
`/api/films`  
`/api/film-seriess`  
`/api/film-releases`  
`/api/genres`  
`/api/people`  
`/api/ratings`  
`/api/release-collections`  
`/api/studios`  
`/api/translation`  
`/api/upload/files`

#### Authenticated APIs

All the above, plus:

`/api/my-books`  
`/api/my-book-releases`  
`/api/my-films`  
`/api/my-film-releases`  
`/api/my-positions`
