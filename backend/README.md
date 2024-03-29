# books-n-films backend

## Powered by:

* [Strapi](https://strapi.io/)
* [MariaDB](https://mariadb.org/)
* [Docker](https://www.docker.com/)
* [npx @strapi-community/dockerize](https://github.com/strapi-community/strapi-tool-dockerize)

## Running locally in dev mode

To run both MariaDB and Strapi locally in a docker container, do the following:

1. Install & configure docker
2. Set up _.env_ file by copying [.env.example](.env.example) to _.env_  
   values can be retrieved from the project's admin
3. run `docker compose build books-n-films-backend` if required
4. run `docker-compose up` to start the database and the Strapi backend application

## 🚀 Getting started with Strapi

Strapi comes with a full featured [Command Line Interface](https://docs.strapi.io/developer-docs/latest/developer-resources/cli/CLI.html) (CLI) which lets you scaffold and manage your project in seconds.

#### `develop`

Start your Strapi application with autoReload enabled. [Learn more](https://docs.strapi.io/developer-docs/latest/developer-resources/cli/CLI.html#strapi-develop)

```
npm run dev
```

#### `start`

Start your Strapi application with autoReload disabled. [Learn more](https://docs.strapi.io/developer-docs/latest/developer-resources/cli/CLI.html#strapi-start)

```
npm run start
```

#### `build`

Build your admin panel. [Learn more](https://docs.strapi.io/developer-docs/latest/developer-resources/cli/CLI.html#strapi-build)

```
npm run build
```

### Linting

Using [Prettier](https://www.npmjs.com/package/prettier) and [ESLint](https://www.npmjs.com/package/eslint) to enforce
code style. Available scripts:

* `lint` applies all linters to check the code
* `lint:fix` applies all linters to fix the code
* `prettier` applies a prettier check on the code
* `prettier:fix` applies a prettier fix on the code
* `eslint` applies an eslint check on the code
* `eslint:fix` applies an eslint fix on the code

### ⚙️ Deployment

Strapi gives you many possible deployment options for your project. Find the one that suits you on the [deployment section of the documentation](https://docs.strapi.io/developer-docs/latest/setup-deployment-guides/deployment.html).

### 📚 Learn more

* [Resource center](https://strapi.io/resource-center) - Strapi resource center.
* [Strapi documentation](https://docs.strapi.io) - Official Strapi documentation.
* [Strapi tutorials](https://strapi.io/tutorials) - List of tutorials made by the core team and the community.
* [Strapi blog](https://docs.strapi.io) - Official Strapi blog containing articles made by the Strapi team and the community.
* [Changelog](https://strapi.io/changelog) - Find out about the Strapi product updates, new features and general improvements.

Feel free to check out the [Strapi GitHub repository](https://github.com/strapi/strapi). Your feedback and contributions are welcome!

### ✨ Community

* [Discord](https://discord.strapi.io) - Come chat with the Strapi community including the core team.
* [Forum](https://forum.strapi.io/) - Place to discuss, ask questions and find answers, show your Strapi project and get feedback or just talk with other Community members.
* [Awesome Strapi](https://github.com/strapi/awesome-strapi) - A curated list of awesome things related to Strapi.

---

<sub>🤫 Psst! [Strapi is hiring](https://strapi.io/careers).</sub>
