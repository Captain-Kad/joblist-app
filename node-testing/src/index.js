// var initialJobs = require('./initialJobs');
import initialJobs from './initialJobs.js';
import express from 'express';
import cors from 'cors';
import pool from './db.js';
import bodyParser from 'body-parser';
import { getAllJobs, postNewJob } from './jobHelper.js';

// var express = require('express');
var app = express();

app.use(cors());
app.use(express.json());

app.get('/', function (req, res) {
    const jobList = initialJobs;

    res.send(jobList);
});

app.post('/register', function (req, res) {
    // const { name, age } = req.body;
    var name = req.body.name;

    res.send(name);
})

// GET all jobs
app.get('/jobs', getAllJobs);

// POST a new job
app.post('/jobs', postNewJob);

app.listen(3001);