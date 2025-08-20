import pool from "./db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import nodemailer from "nodemailer";

const SALT_ROUNDS = 10;
const JWT_EXPIRES_IN = "7d"; // adjust as needed

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST, // smtp.sendgrid.net
  port: Number(process.env.SMTP_PORT || 587), // 587 default STARTTLS
  secure: Number(process.env.SMTP_PORT) === 465, // true only for 465
  auth: {
    user: process.env.SMTP_USER, // "apikey"
    pass: process.env.SMTP_PASS, // your SendGrid API key
  },
});

export const registerUser = async (req, res) => {
  const { first_name, last_name, email, password } = req.body;

  if (!first_name || !last_name || !email || !password) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    // Check if email exists
    const existing = await pool.query(
      "SELECT user_id FROM users WHERE email=$1",
      [email]
    );
    if (existing.rows.length > 0) {
      return res.status(409).json({ message: "Email already registered." });
    }

    const password_hash = await bcrypt.hash(password, SALT_ROUNDS);

    // 🔹 Generate UUID for the new user
    const user_id = uuidv4();

    // 🔹 Insert with explicit user_id (UUID)
    const result = await pool.query(
      `INSERT INTO users (user_id, first_name, last_name, email, password_hash)
       VALUES ($1,$2,$3,$4,$5)
       RETURNING user_id, first_name, last_name, email`,
      [user_id, first_name, last_name, email, password_hash]
    );

    // Issue token
    const payload = { user_id: result.rows[0].user_id, email };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });

    try {
      await transporter.sendMail({
        to: email,
        from: {
          address: process.env.FROM_EMAIL,
          name: process.env.FROM_NAME || "Joblist",
        },
        subject: "Welcome to Joblist 🎉",
        text: `Hi ${first_name},

  Welcome to Joblist! We're excited to have you onboard.

  – The Joblist Team`,
        html: `<p>Hi ${first_name},</p>
            <p>Welcome to <strong>Joblist</strong>! We're excited to have you onboard.</p>
            <p>– The Joblist Team</p>`,
      });
    } catch (mailErr) {
      console.error("SendGrid SMTP mail error:", mailErr?.response || mailErr);
    }

    res.status(201).json({ user: result.rows[0], token });
  } catch (err) {
    console.error("Error in registerUser:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password required." });
  }

  try {
    const result = await pool.query(
      "SELECT user_id, first_name, last_name, email, password_hash FROM users WHERE email=$1",
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    const user = result.rows[0];
    const ok = await bcrypt.compare(password, user.password_hash);
    if (!ok) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    const payload = { user_id: user.user_id, email: user.email };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });

    // Don’t return password_hash
    delete user.password_hash;

    res.json({ user, token });
  } catch (err) {
    console.error("Error in loginUser:", err);
    res.status(500).json({ message: "Server error" });
  }
};
