export default ({ env }) => ({
  'editorjs': {
    enabled: true,
  },

  'transformer': {
    enabled: true,
    config: {
      prefix: '/api/',
      responseTransforms: {
        removeAttributesKey: true,
        removeDataKey: true,
      }
    }
  },
});
