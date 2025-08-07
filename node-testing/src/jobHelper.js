import pool from './db.js';

export const getAllJobs = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM jobs ORDER BY posted_date DESC');
    res.json(result.rows);
  } catch (err) {
    console.error("Database error in GET /jobs:", err);
    res.status(500).send("Database error: " + (err.message || err));
  }
};

export const postNewJob = async (req, res) => {
  const {
    title, description, requirements, job_type,
    location, salary, job_category, category_id, job_url
  } = req.body;

  const posted_date = new Date().toISOString().split('T')[0];

  try {
    const result = await pool.query(
      `INSERT INTO jobs 
      (title, description, requirements, job_type, location, salary, posted_date, job_category, category_id, job_url)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING *`,
      [title, description, requirements, job_type, location, salary, posted_date, job_category, category_id, job_url]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Database error in POST /jobs:", err);
    res.status(500).send("Error creating job: " + err.message);
  }
};
