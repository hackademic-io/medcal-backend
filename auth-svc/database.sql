

CREATE TABLE users(
  user_id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  role VARCHAR(55) NOT NULL,
  isActivated BOOLEAN DEFAULT false NOT NULL,
  activationLink VARCHAR(255) NOT NULL
);

CREATE TABLE tokens(
  id SERIAL PRIMARY KEY,
  user_id INT,
  FOREIGN KEY (user_id) REFERENCES users (user_id),
  refreshToken VARCHAR(512) NOT NULL
);
