// var initialJobs = require('./initialJobs');
import initialJobs from "./initialJobs.js";
import express from "express";
import cors from "cors";
import path from "path";
import cookieParser from "cookie-parser";
import pool from "./db.js";
import bodyParser from "body-parser";
import { getAllJobs, postNewJob } from "./jobHelper.js";
import { getJobById } from "./jobHelper.js";
import { registerUser, loginUser } from "./authHelper.js";
import { requireAuth } from "./authMiddleware.js";
import uploadRoutes from "./uploads.js";

// var express = require('express');
const app = express();

app.use(cors());
app.use(express.json());

app.use("/uploads", express.static(path.resolve("uploads"))); // GET files
app.use("/uploads", requireAuth, uploadRoutes); // we import requireAuth inside uploads.js now

app.get("/", function (req, res) {
  const jobList = initialJobs;

  res.send(jobList);
});

app.post("/register", function (req, res) {
  // const { name, age } = req.body;
  var name = req.body.name;

  res.send(name);
});

// Public auth routes
app.post("/auth/register", registerUser);
app.post("/auth/login", loginUser);

app.use("/uploads", requireAuth, uploadRoutes);

// Protected job routes (require login)
app.get("/jobs", requireAuth, getAllJobs);
app.post("/jobs", requireAuth, postNewJob);
app.get("/jobs/:id", requireAuth, getJobById);

app.listen(3001, () =>
  console.log("✅ Backend running at http://localhost:3001")
);
