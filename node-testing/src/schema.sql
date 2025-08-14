CREATE TABLE IF NOT EXISTS jobs (
  job_id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  requirements TEXT,
  job_type TEXT,
  location TEXT,
  salary TEXT,
  posted_date DATE,
  job_category TEXT,
  category_id INT,
  job_url TEXT
);

-- Users table for auth
CREATE TABLE IF NOT EXISTS users (
  user_id SERIAL PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name  TEXT NOT NULL,
  email      TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

