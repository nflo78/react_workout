-- psql postgres -f database/schema.sql

SELECT 'CREATE DATABASE workoutv1' WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'userlist')\gexec

\c workoutv1;

CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(30) UNIQUE,
  password BIGINT
);

CREATE TABLE IF NOT EXISTS exercises (
  id SERIAL PRIMARY KEY,
  name VARCHAR(30),
  user_id INT,
  note VARCHAR(50),
  UNIQUE (name, user_id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS splits (
  id SERIAL PRIMARY KEY,
  user_id INT,
  name VARCHAR(20),
  UNIQUE (name, user_id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS splitExerciseRelation (
  exercise_id INT,
  split_id INT,
  UNIQUE (exercise_id, split_id),
  FOREIGN KEY (exercise_id) REFERENCES exercises(id),
  FOREIGN KEY (split_id) REFERENCES splits(id)
);

CREATE TABLE IF NOT EXISTS sets (
  id SERIAL PRIMARY KEY,
  exercise_id INT,
  timestamp TIMESTAMPTZ,
  reps INT,
  weight INT,
  FOREIGN KEY (exercise_id) REFERENCES exercises(id)
);

SET timezone = 'America/Los_Angeles';