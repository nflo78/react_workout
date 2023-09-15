-- psql postgres -f database/schema.sql

SELECT 'CREATE DATABASE workoutv1' WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'userlist')\gexec

\c workoutv1;

CREATE TABLE IF NOT EXISTS userlist (
  id SERIAL PRIMARY KEY,
  user_name VARCHAR (30) UNIQUE,
  hashpw BIGINT,
  splits VARCHAR (50)
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
