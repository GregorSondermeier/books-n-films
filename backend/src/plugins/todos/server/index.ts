import { factories } from '@strapi/strapi';

export default {
  controllers: {
    todo: factories.createCoreController('plugin::todos.todo'),
  },
  services: {
    todo: factories.createCoreService('plugin::todos.todo'),
  },
  contentTypes: {
    todo: {
      schema: {
        kind: 'collectionType',
        collectionName: 'todos',
        info: {
          singularName: 'todo',
          pluralName: 'todos',
          displayName: 'Todo'
        },
        options: {
          draftAndPublish: false,
          comment: '',
        },
        attributes: {
          title: {
            type: 'string',
          },
          description: {
            type: 'customField',
            customField: 'plugin::editorjs.editorjs',
          },
          done: {
            'type': 'boolean',
            required: true,
            default: false,
          },
        },
      },
    },
  },
  routes: {
    'content-api': {
      type: 'content-api',
      // @ts-ignore because strapi typedef seems wrong; core router in plugin doesn't work
      routes: factories.createCoreRouter('plugin::todos.todo').routes,
      // custom routes will work in comparison:
      // routes: [
      //   {
      //     method: 'GET',
      //     path: '/',
      //     handler: 'plugin::todos.todo.find',
      //   },
      // ],
    },
  },
};
