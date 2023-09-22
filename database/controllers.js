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

    const queryString = `INSERT INTO users(name, password) VALUES('${req.body.user}', '${req.body.password}')`

    return dbPool.query(queryString)
      .then(() => res.sendStatus(201))
      .catch((err)  => {
        console.log('CONTROLLER ERR: ', err);
        return res.sendStatus(401)
      })

    // const queryString = `WITH newuser_insert AS (
    //   INSERT INTO userlist(user_name) VALUES('${req.body.user}') RETURNING id)
    //   INSERT INTO userinfo(user_id, hashpw) VALUES((SELECT id FROM newuser_insert), ${req.body.password})`

    // return dbPool.query(queryString)
    //   .then(() => res.sendStatus(201))
    //   .catch((err) => {console.log('CONTROLLER ERROR: ', err); return res.sendStatus(409)})
  },

  loginUser: (req, res) => {
    console.log('LOGIN CONTROLLER: ', req.body)

    const queryString = `SELECT password FROM users WHERE name = '${req.body.user}'`

    return dbPool.query(queryString)
      .then((result) => {
        if (!result.rows[0]) {
          return res.sendStatus(401)
        }
        const userPw = Number(result.rows[0].password) || 'Invalid'
        if (userPw === req.body.password) {
          res.cookie('workoutv1', req.body.user, { maxAge: 60 * 1000 * 30} )
          res.sendStatus(201);
        } else {
          return res.sendStatus(401)
        }
      })
      .catch((err) => {console.log('LOGIN USER ERROR: ', err)})
    // const queryString = `SELECT hashpw FROM userinfo WHERE user_id = (SELECT id FROM userlist WHERE user_name = '${req.body.  user}')`

    // return dbPool.query(queryString)
    //   .then((result) => {
    //     console.log('LOGIN QUERY RESULT: ', result)
    //     const userPw = Number(result.rows[0].hashpw)
    //     if (userPw === req.body.password) {
    //       res.cookie('workoutv1', req.body.user, { maxAge: 60 * 1000 * 30} )
    //       res.sendStatus(201);
    //     } else {
    //       return res.sendStatus(401)
    //     }
    //   })
    //   .catch((err) => {console.log('LOGIN USER ERROR: ', err)})
  },

  submitSplit: (req, res) => {
    const queryString = `WITH split_insert AS (SELECT id FROM users WHERE name = '${req.body.user}')
    INSERT INTO splits(user_id, name) VALUES((SELECT id FROM split_insert), '${req.body.newsplit}')`

    return dbPool.query(queryString)
      .then(() => {console.log('DB RECEIVED NEW SPLIT')})
      .catch((err) => {console.log('DB NEW SPLITERR: ', err)})
  },

  getInfo: (req, res) => {
    console.log('USER!: ', req.body.user)
    const queryString = `WITH user_name AS (SELECT id FROM users WHERE name = '${req.body.user}')
    SELECT name FROM splits WHERE user_id = (SELECT id FROM user_name)`

    return dbPool.query(queryString)
      .then((result) => res.send(result.rows))
      .catch((err) => {console.log('GET INFO ERR: ', err)})
  }
}