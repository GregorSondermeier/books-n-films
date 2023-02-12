require('dotenv').config();
const { exec } = require('child_process');
const { format } = require('date-fns');

const {
  DATABASE_HOST,
  DATABASE_PORT,
  DATABASE_NAME,
  DATABASE_USERNAME,
  DATABASE_PASSWORD,
} = process.env;

const now = format(new Date(), 'yyyy-MM-dd_HH-mm');

const command = `mysqldump ${DATABASE_NAME} --host='${DATABASE_HOST}' --port='${DATABASE_PORT}' --user='${DATABASE_USERNAME}' --password='${DATABASE_PASSWORD}' --result-file='${__dirname}/../backups/db_dump_${now}.sql'`;


exec(command, (err, stdout, stderr) => {
  if (err) {
    console.error(err)
  } else {
    console.log(stdout);
    console.warn(stderr);
  }
});
