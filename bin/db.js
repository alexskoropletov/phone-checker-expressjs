const config = require('./config');
const pgp = require('pg-promise')(/*options*/);

module.exports = pgp('postgres://'
  + config.db.username
  + ':'
  + config.db.password
  + '@'
  + config.db.host
  + ':'
  + config.db.port
  + '/'
  + config.db.database
);
