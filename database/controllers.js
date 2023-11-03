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
  signUpUser: async (req, res) => {
    await dbPool.query(`INSERT INTO users(name, password) VALUES('${req.body.user}', '${req.body.password}')`);
    return res.sendStatus(201);
  },

  loginUser: async (req, res) => {
    const loginQuery = await dbPool.query(`SELECT password FROM users WHERE name = '${req.body.user}'`);
    if (!loginQuery.rows[0]) {
      return res.sendStatus(401);
    }
    res.cookie('workoutv1', req.body.user, { maxAge: 60 * 1000 * 30 });
    return res.sendStatus(201);
  },

  submitSplit: async (req, res) => {
    await dbPool.query(`WITH split_insert AS (SELECT id FROM users WHERE name = '${req.body.user}')
    INSERT INTO splits(user_id, name) VALUES((SELECT id FROM split_insert), '${req.body.newsplit}')`);
    res.sendStatus(201);
    console.log('DB RECEIVED NEW SPLIT');
  },

  fetchInfo: async (req, res) => {
    const userSplits = await dbPool.query(`WITH user_name AS (SELECT id FROM users WHERE name = '${req.body.user}')
    SELECT name FROM splits WHERE user_id = (SELECT id FROM user_name)`);
    const userExercises = await dbPool.query(`WITH user_name AS (SELECT id FROM users where NAME = '${req.body.user}')
    SELECT name FROM exercises WHERE user_id = (SELECT id FROM user_name)`);
    return res.send({ splits: userSplits.rows, exercises: userExercises.rows });
  },

  newExercise: async (req, res) => {
    try {
      await dbPool.query('BEGIN');
      const exerciseQuery = `WITH exercise_insert AS (SELECT id FROM users WHERE name = '${req.body.user}')
      INSERT INTO exercises(user_id, name) VALUES((SELECT id FROM exercise_insert), '${req.body.exercise}') RETURNING user_id, id`;
      const queryResult = await dbPool.query(exerciseQuery);
      const userId = queryResult.rows[0].user_id;
      const exerciseId = queryResult.rows[0].id;
      for (let i = 0; i < req.body.relation.length; i++) {
        const query = `WITH split_s AS (SELECT id FROM splits WHERE name = '${req.body.relation[i]}' AND user_id = ${userId})
        INSERT into splitExerciseRelation(exercise_id, split_id) VALUES(${exerciseId}, (SELECT id FROM split_s))`;
        await dbPool.query(query);
      }
      await dbPool.query('COMMIT');
    } catch (e) {
      await dbPool.query('ROLLBACK');
      throw (e);
    }
    return res.sendStatus(201);
    // console.log('DB RECEIVED NEW EXERCISE');
  },

  splitExercise: async (req, res) => {
    const queryString = `WITH split_select AS (SELECT id FROM splits WHERE name = '${req.body.currentSplit}')
    SELECT name FROM exercises LEFT JOIN splitExerciseRelation ON splitExerciseRelation.exercise_id = exercises.id WHERE splitExerciseRelation.split_id = (SELECT id FROM split_select)`;
    const exercises = await dbPool.query(queryString);
    return res.send(exercises.rows);
  },

  submitExercise: async (req, res) => {
    console.log('DB RECEIVED SUBMISSION: ', req.body);
    try {
      await dbPool.query('BEGIN');
      const exerciseQuery = await dbPool.query(`SELECT exercises.id FROM exercises LEFT JOIN users ON exercises.user_id = users.id WHERE exercises.name = '${req.body.exercise}' AND users.name = '${req.body.user}'`);
      const exerciseId = exerciseQuery.rows[0].id;
      const date = new Date(req.body.date);
      const timeZone = 'America/Los_Angeles';
      const formattedDate = date.toLocaleString('en-US', { timeZone });
      // console.log('DB DATE: ', formattedDate);
      for (let i = 0; i < req.body.reps.length; i++) {
        const newSet = `INSERT INTO sets(exercise_id, timestamp, reps, weight) VALUES(${exerciseId}, '${formattedDate}', ${req.body.reps[i]}, ${req.body.weight[i]})`;
        await dbPool.query(newSet);
      }
      await dbPool.query('COMMIT');
    } catch (e) {
      await dbPool.query('ROLLBACK');
      throw e;
    }
    return res.sendStatus(201);
  },
};
