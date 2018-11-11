CREATE TABLE IF NOT EXISTS posts (
  id SERIAL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  image TEXT NOT NULL,
  createdAt DATE NOT NULL DEFAULT current_date
);
