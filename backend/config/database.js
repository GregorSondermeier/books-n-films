const path = require('path');

module.exports = ({ env }) => ({
  connection: {
    client: env('DATABASE_CLIENT'),
    connection: {
      filename: path.join(__dirname, '..', env('DATABASE_FILENAME')),
    },
    useNullAsDefault: true,
  },
});
