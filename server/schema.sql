psql postgres;

SELECT 'CREATE DATABASE workoutv1' WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'userlist')\gexec

\c workoutv1;

CREATE TABLE IF NOT EXISTS userlist (
  id SERIAL PRIMARY KEY,
  user VARCHAR (30),
);

CREATE TABLE IF NOT EXISTS userinfo (
  id SERIAL PRIMARY KEY,
  user_id INT,
  hashpw BIGINT,
  FOREIGN KEY (user_id)
  REFERENCES userlist(id)
);

