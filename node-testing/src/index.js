// var initialJobs = require('./initialJobs');
import initialJobs from './initialJobs.js';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

// var express = require('express');
var app = express();

app.use(cors());

app.get('/', function (req, res) {
    const jobList = initialJobs;

    res.send(jobList);
});

app.post('/register', function (req, res) {
    // const { name, age } = req.body;
    var name = req.body.name;

    res.send(name);
})

app.listen(3001);