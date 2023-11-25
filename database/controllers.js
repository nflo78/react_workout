require('dotenv').config();
const { Pool } = require('pg');
const jwt = require('jsonwebtoken');

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
    const userQuery = await dbPool.query(`SELECT name FROM users WHERE name = '${req.body.user}'`);
    const user = userQuery.rows[0];
    console.log('LOGIN DB ID: ', user);
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);

    res.cookie('workoutv1', accessToken, { maxAge: 60 * 1000 * 30 });
    return res.sendStatus(201);
    // res.cookie('workoutv1', req.body.user, { maxAge: 60 * 1000 * 30 });
    // return res.sendStatus(201);
  },
  authenticateUser: async (req, res) => {
    console.log('DB AUTH: ', req.body);
    const token = req.body.authToken;
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) {
        throw err;
      }
      return res.send(user);
    });
  },

  recentWorkout: async (req, res) => {
    // not done
    // const queryStr = `WITH recent_date AS (SELECT sets.timestamp::date FROM sets ORDER BY sets.timestamp::date DESC LIMIT 1)
    // SELECT users.name, exercises.name, sets.timestamp::date, sets.reps, sets.weight FROM exercises INNER JOIN sets ON exercises.id = sets.exercise_id INNER JOIN users ON users.id = sets.user_id WHERE sets.timestamp::date = (SELECT timestamp FROM recent_date) AND users.name = '${req.body.user}'`;
    // const dateQuery = await dbPool.query(`WITH recent_date AS (SELECT sets.timestamp::date FROM sets WHERE sets.timestamp <= '${req.body.date}' ORDER BY sets.timestamp DESC LIMIT 1)
    // SELECT users.name, exercises.name, sets.timestamp, sets.reps, sets.weight FROM exercises INNER JOIN sets ON exercises.id = sets.exercise_id INNER JOIN users ON users.id = sets.user_id WHERE sets.timestamp::date = (SELECT timestamp FROM recent_date) AND users.name = '${req.body.user}'`);

    // latest attempt
    // const splitTs = await dbPool.query(`SELECT sets.timestamp, splits.name FROM sets INNER JOIN splits ON splits.id = sets.split_id INNER JOIN users ON sets.user_id = users.id WHERE users.name='${req.body.user}' AND sets.timestamp <= '${req.body.date}' ORDER BY sets.timestamp DESC LIMIT 1`);
    // console.log('splitTs :', splitTs.rows[0]);
    // const splitName = splitTs.rows[0] ? splitTs.rows[0].name : undefined;
    // const newDate = new Date(splitTs.rows[0].timestamp);
    // const isoDate = newDate.toISOString();
    // const recentSetsQuery = await dbPool.query(`SELECT exercises.name, sets.reps, sets.weight FROM exercises INNER JOIN sets ON exercises.id = sets.exercise_id WHERE sets.timestamp::date = '${isoDate}'::date`);
    // const recentSets = recentSetsQuery.rows[0];
    // console.log('RECENT SETS: ', recentSetsQuery)
    // res.send({split: splitName, sets: recentSets})


    // console.log('NEW DATE: ', newDate)
    // const dateQuery = await dbPool.query(`SELECT (TIMESTAMP WITH TIME ZONE '${newDate.toISOString()}'::date)`)
    // console.log('DATE QUERY: ', dateQuery)

    // const testStr = await dbPool.query(`WITH recent_date AS (SELECT sets.timestamp::date FROM sets INNER JOIN users ON sets.user_id = users.id WHERE users.name='${req.body.user}' AND sets.timestamp <= '${req.body.date}' ORDER BY sets.timestamp DESC LIMIT 1)
    // SELECT splits.name AS splitName, exercises.name, sets.timestamp, sets.reps, sets.weight FROM exercises INNER JOIN sets ON exercises.id = sets.exercise_id INNER JOIN splits ON splits.id = sets.split_id WHERE sets.timestamp::date = (SELECT timestamp FROM recent_date)`);
    // console.log('DATEQUERY: ', {splitName: splitTs.rows[0].name, sets: recentSets.row[0]});
    // const lastWorkout = await dbPool.query(queryStr);
    // res.send(dateQuery.rows);
  },

  submitSplit: async (req, res) => {
    // await dbPool.query(`WITH split_insert AS (SELECT id FROM users WHERE name = '${req.body.user}')
    // INSERT INTO splits(user_id, name) VALUES((SELECT id FROM split_insert), '${req.body.newsplit}')`);
    console.log('BODY: ', req.body);
    await dbPool.query(`INSERT INTO splits(user_id, name) VALUES(${req.body.userId}, '${req.body.newsplit}')`)
    res.sendStatus(201);
    console.log('DB RECEIVED NEW SPLIT');
  },

  fetchInfo: async (req, res) => {
    const userQuery = await dbPool.query(`SELECT id FROM users WHERE name = '${req.body.user}'`);
    const userId = userQuery.rows[0].id;
    console.log('USERQUERY: ', userQuery);
    const userSplits = await dbPool.query(`WITH user_name AS (SELECT id FROM users WHERE name = '${req.body.user}')
    SELECT name FROM splits WHERE user_id = (SELECT id FROM user_name)`);
    const userExercises = await dbPool.query(`WITH user_name AS (SELECT id FROM users where NAME = '${req.body.user}')
    SELECT name FROM exercises WHERE user_id = (SELECT id FROM user_name)`);
    // const sessions = await dbPool.query(`SELECT id FROM sessions WHERE user_id = ${userId}`);
    return res.send({ userId: userId, splits: userSplits.rows, exercises: userExercises.rows });
  },

  newExercise: async (req, res) => {
    try {
      await dbPool.query('BEGIN');
      // const exerciseQuery = `WITH exercise_insert AS (SELECT id FROM users WHERE name = '${req.body.user}')
      // INSERT INTO exercises(user_id, name) VALUES((SELECT id FROM exercise_insert), '${req.body.exercise}') RETURNING user_id, id`;
      console.log('NEW EXER USERID: ', req.body.userId)
      const exerciseQuery = `INSERT INTO exercises(user_id, name) VALUES(${req.body.userId}, '${req.body.exercise}') RETURNING id`;
      const queryResult = await dbPool.query(exerciseQuery);
      // const userId = queryResult.rows[0].user_id;
      const exerciseId = queryResult.rows[0].id;
      for (let i = 0; i < req.body.relation.length; i++) {
        const query = `WITH split_s AS (SELECT id FROM splits WHERE name = '${req.body.relation[i]}' AND user_id = ${req.body.userId})
        INSERT into split_exercises(exercise_id, split_id) VALUES(${exerciseId}, (SELECT id FROM split_s))`;
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
    SELECT name FROM exercises LEFT JOIN split_exercises ON split_exercises.exercise_id = exercises.id WHERE split_exercises.split_id = (SELECT id FROM split_select)`;
    const exercises = await dbPool.query(queryString);
    return res.send(exercises.rows);
  },

  fetchSession: async (req, res) => {
    const { userId } = req.body;
    // let sessionId;
    // let splitName;
    const payload = {};
    payload.exercises = [];
    const unfinishedSession = await dbPool.query(`SELECT splits.name, sessions.id FROM splits LEFT JOIN sessions ON sessions.split_id = splits.id WHERE splits.user_id = ${userId} AND sessions.start_date IS NOT NULL AND sessions.end_date IS null LIMIT 1`);
    if (unfinishedSession.rows[0]) {
      // payload.exercises = [];
      payload.split = unfinishedSession.rows[0].name;
      const sessionId = unfinishedSession.rows[0].id;
      payload.sessionId = sessionId;
      // orders distinct exercise names by which was done first
      const distinctExercise = await dbPool.query(`SELECT name, exercise_id, session_order
      FROM ( SELECT DISTINCT ON (exercises.name) *
      FROM exercises LEFT JOIN sets ON sets.exercise_id = exercises.id WHERE sets.session_id = ${sessionId} ORDER BY exercises.name, sets.session_order ) AS e
      ORDER BY session_order`);
      console.log('DISTINCT EXERCISES: ', distinctExercise.rows);
      for (let i = 0; i < distinctExercise.rows.length; i++) {
        payload.exercises.push({ name: distinctExercise.rows[i].name });
        const setInsert = await dbPool.query(`SELECT reps, weight, session_order FROM sets WHERE session_id = ${sessionId} AND exercise_id = ${distinctExercise.rows[i].exercise_id} ORDER by session_order`);
        // console.log('SET INSERT: ', setInsert.rows);
        payload.exercises[i].sets = setInsert.rows;
      }
    }
    console.log('PAYLOAD: ', payload);
    return res.send(payload);
    // return res.send({ split: splitName, sessionId: sessionId, exercises: exercises });
  },

  startSession: async (req, res) => {
    const isoDate = new Date(req.body.startDate).toISOString();
    console.log('start date: ', isoDate);
    const startQuery = `WITH split_select AS (SELECT id FROM splits WHERE name = '${req.body.currentSplit}' AND user_id = ${req.body.userId})
    INSERT INTO sessions(user_id, split_id, start_date) VALUES(${req.body.userId}, (SELECT id FROM split_select), '${isoDate}')`;
    await dbPool.query(startQuery);
    res.sendStatus(201);
  },

  stopSession: async (req, res) => {
    const isoDate = new Date().toISOString();
    console.log('stop date: ', isoDate);
    const stopQuery = `UPDATE sessions SET end_date = '${isoDate}' WHERE end_date IS NULL AND user_id = ${req.body.userId}`;
    await dbPool.query(stopQuery);
    res.sendStatus(201);
  },

  submitSet: async (req, res) => {
    const { userId, reps, weight, exercise } = req.body;
    // console.log('SUBMIT SET BODY: ', req.body);
    const exerciseQuery = await dbPool.query(`SELECT id FROM exercises WHERE name = '${exercise}' AND user_id = ${userId}`);
    const exerciseId = exerciseQuery.rows[0].id;
    const sessionQuery = `SELECT id FROM sessions WHERE end_date IS NULL AND user_id = ${userId}`;
    const unfinishedSession = await dbPool.query(sessionQuery);
    const sessionId = unfinishedSession.rows[0].id;
    const orderQuery = `SELECT session_order FROM sets WHERE session_id = ${sessionId} ORDER BY session_order DESC LIMIT 1`;
    const order = await dbPool.query(orderQuery);
    let lastOrder = 0;
    if (order.rows[0]) {
      lastOrder = order.rows[0].session_order;
    }
    // const lastOrder = order.rows[0].session_order || 0;
    const setQuery = `INSERT INTO sets(exercise_id, session_id, reps, weight, session_order) VALUES(${exerciseId}, ${sessionId}, ${reps}, ${weight}, ${lastOrder + 1})`;
    await dbPool.query(setQuery);
    res.sendStatus(201);
  },

  submitExercise: async (req, res) => {
    console.log('DB RECEIVED SUBMISSION: ', req.body);
    const isoDate = req.body.date;
    // workoutcount is now lastworkout
    // need to finish
    try {
      await dbPool.query('BEGIN');
      const userQuery = await dbPool.query(`SELECT id FROM users WHERE name = '${req.body.user}'`);
      const userId = userQuery.rows[0].id;
      const workoutQuery = await dbPool.query(`INSERT INTO workouts(user_id, date) SELECT ${userId}, '${isoDate}' WHERE NOT EXISTS (SELECT id FROM workouts WHERE user_id = ${userId} AND id = ${workoutCount}) RETURNING id`);
      // const workoutQuery = await dbPool.query(`SELECT id FROM workouts WHERE user_id = ${userId} AND id = ${workoutCount}`);
      const workoutId = workoutQuery.rows[0].id;
      const exerciseQuery = await dbPool.query(`SELECT exercises.id FROM exercises LEFT JOIN users ON exercises.user_id = users.id WHERE exercises.name = '${req.body.exercise}' AND users.id = '${userId}'`);
      const exerciseId = exerciseQuery.rows[0].id;
      const splitQuery = await dbPool.query(`SElECT id FROM splits WHERE name = '${req.body.split}'`);
      const splitId = splitQuery.rows[0].id;
      // console.log('DATE: ', req.body.date);
      console.log(isoDate);
      for (let i = 0; i < req.body.reps.length; i++) {
        const newSet = `INSERT INTO sets(split_id, exercise_id, workout_id, reps, weight) VALUES(${splitId}, ${exerciseId}, ${workoutId}, ${req.body.reps[i]}, ${req.body.weight[i]})`;
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
