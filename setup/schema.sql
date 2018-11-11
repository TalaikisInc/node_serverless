CREATE TABLE IF NOT EXISTS posts (
  id SERIAL,
  title varchar(255) NOT NULL,
  content TEXT NOT NULL,
  image TEXT NOT NULL,
  createdAt TIMESTAMPTZ NOT NULL DEFAULT current_date
);
