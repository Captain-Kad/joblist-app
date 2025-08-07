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
