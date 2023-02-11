export default (/*{ env }*/) => ({
  editorjs: {
    enabled: true,
  },

  todos: {
    enabled: true,
    resolve: './src/plugins/todos',
  },
  transformer: {
    enabled: true,
    config: {
      prefix: '/api/',
      responseTransforms: {
        removeAttributesKey: true,
        removeDataKey: true,
      },
    },
  },
});
