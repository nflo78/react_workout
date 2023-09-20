-- psql postgres -f database/schema.sql

SELECT 'CREATE DATABASE workoutv1' WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'userlist')\gexec

\c workoutv1;

CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(30) UNIQUE,
  password BIGINT
);

CREATE TABLE IF NOT EXISTS splits (
  id SERIAL PRIMARY KEY,
  user_id INT,
  name VARCHAR(20),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS workouts (
  id SERIAL PRIMARY KEY,
  split_id INT,
  timestamp DATE,
  note VARCHAR(255),
  FOREIGN KEY (split_id) REFERENCES splits(id)
);

CREATE TABLE IF NOT EXISTS exercises (
  id SERIAL PRIMARY KEY,
  workout_id INT,
  name VARCHAR(30),
  parameter VARCHAR(10),
  FOREIGN KEY (workout_id) REFERENCES workouts(id)
);

CREATE TABLE IF NOT EXISTS sets (
  id SERIAL PRIMARY KEY,
  exercise_id INT,
  reps INT,
  failure BOOLEAN,
  FOREIGN KEY (exercise_id) REFERENCES exercises(id)
);
-- CREATE TABLE IF NOT EXISTS userlist (
--   id SERIAL PRIMARY KEY,
--   user_name VARCHAR (30) UNIQUE
-- );

-- CREATE TABLE IF NOT EXISTS userinfo (
--   id SERIAL PRIMARY KEY,
--   user_id INT UNIQUE,
--   hashpw BIGINT,
--   splits TEXT[],
--   FOREIGN KEY (user_id) REFERENCES userlist(id)
-- );

-- CREATE TABLE IF NOT EXISTS splitsinfo (
--   id SERIAL PRIMARY KEY,
--   user_id INT,
--   exercies VARCHAR(50),
--   FOREIGN KEY (user_id) REFERENCES userinfo(user_id)
-- );
