const express = require('express');
require('./db');
const mongooseLib = require('mongoose');
const cors = require('cors');
const processJob = require('./worker');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(cors({
    origin: "*",
    methods: ["GET", "POST"]
}));

app.use(express.json());
app.use((req, res, next) => {
    res.set("Cache-Control", "no-store");
    next();
});

const Job = require('./jobModel');


//  SUBMIT JOB
app.post('/submit', async(req, res) => {
    try {
        const { data } = req.body;

        const job = new Job({
            data,
            status: "pending",
            progress: 0
        });

        await job.save();

        res.json({ jobId: job._id });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


//  START JOB (BACKGROUND SAFE)
app.post('/start/:id', async(req, res) => {
    try {
        const id = req.params.id;

        // 🔥 run worker in background (non-blocking)
        setImmediate(() => {
            processJob(id).catch(err => {
                console.log("Worker Error:", err);
            });
        });

        res.json({
            message: "Processing Started",
            jobId: id
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


//  QUICK TEST ROUTE
app.get('/start-job', async(req, res) => {
    try {
        const job = new Job({
            data: [1, 2, 3, 4, 5],
            status: "pending",
            progress: 0
        });

        await job.save();

        setImmediate(() => processJob(job._id));

        res.send(`Job Started with ID: ${job._id}`);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


//  JOB STATUS (ONLY NEEDED FIELDS)
app.get('/job-status/:id', async(req, res) => {
    try {
        const job = await Job.findById(req.params.id).lean(); // 🔥 FIX

        if (!job) {
            return res.json({ status: "not found", progress: 0 });
        }

        // 🔥 FORCE FRESH RESPONSE
        res.set("Cache-Control", "no-store");

        res.json({
            status: job.status,
            progress: job.progress
        });

    } catch (err) {
        res.json({ status: "error", progress: 0 });
    }
});


//  RESULT (PER JOB FILE)
app.get('/result/:id', (req, res) => {
    const file = path.join(__dirname, `../temp/result-${req.params.id}.txt`);

    if (!fs.existsSync(file)) {
        return res.json({ result: "Waiting..." });
    }

    const data = fs.readFileSync(file, 'utf-8');

    res.json({ result: data });
});

//  SERVER START
app.listen(3000, () => {
    console.log("🚀 Server running on port 3000");
});
