export default ({ env }) => ({
  'users-permissions': {
    config: {
      jwt: {
        algorithm: 'ES512',
        expiresIn: '30d',
      }
    }
  }
});
