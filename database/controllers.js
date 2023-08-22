const { Pool } = require('pg');

const dbPool = new Pool({
  host: process.env.PG_HOST,
  user: process.env.PG_USER,
  port: process.env.PG_PORT,
  database: process.env.PG_DB,
  password: process.env.PG_PASSWORD,
  max: 20,
});
dbPool.connect();

module.exports = {
  signUpUser: (req, res) => {

    console.log('CONTROLLERS GOT');
    console.log(req.body);

    // const queryString = `INSERT INTO userlist(user_name) VALUES('${req.body.user}')`

    const queryString = `WITH newuser_insert AS (
      INSERT INTO userlist(user_name) VALUES('${req.body.user}') RETURNING id)
      INSERT INTO userinfo(user_id, hashpw) VALUES((SELECT id FROM newuser_insert), ${req.body.password})`

    // const queryString = `INSERT INTO userinfo(user_id, hashpw) VALUES(INSERT INTO userlist(user_name) VALUES('${req.body.user}') RETURNING id, ${req.body.password})`


    return dbPool.query(queryString)
      .then(() => res.sendStatus(201))
      .catch((err) => {console.log('CONTROLLER ERROR: ', err)})
  },

  // getUser: (req, res) => {

  // }
}