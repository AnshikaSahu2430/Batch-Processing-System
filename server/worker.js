const Job = require('./jobModel');
const fs = require('fs');
const path = require('path');

async function processJob(jobId) {
    try {
        const job = await Job.findById(jobId);
        if (!job) {
            console.log("Job not found");
            return;
        }

        console.log("JOB STARTED");

        // set processing
        await Job.updateOne({ _id: jobId }, { $set: { status: "processing", progress: 0 } });

        const total = job.data.length;

        for (let i = 0; i < total; i++) {

            await new Promise(r => setTimeout(r, 1500));

            const progress = Math.floor(((i + 1) / total) * 100);

            await Job.updateOne({ _id: jobId }, { $set: { progress: progress } });

            console.log("Progress:", progress);
        }

        console.log("LOOP DONE");

        //  RESULT CALCULATE
        const result = job.data.reduce((sum, x) => sum + (x * 2), 0);

        //  CREATE FOLDER
        const dir = path.join(__dirname, "../temp");
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        //  WRITE RESULT FILE
        const file = path.join(dir, `result-${jobId}.txt`);
        fs.writeFileSync(file, result.toString());

        console.log("RESULT SAVED");

        //  IMPORTANT DELAY
        await new Promise(r => setTimeout(r, 1000));

        // FINAL UPDATE
        await Job.updateOne({ _id: jobId }, { $set: { status: "completed", progress: 100 } });

        console.log("JOB COMPLETED");

    } catch (err) {
        console.log("❌ WORKER ERROR:", err);
    }
}

module.exports = processJob;
