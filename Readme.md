# 🚀 Batch Processing System with Resume Capability

A fault-tolerant batch processing system built using **Node.js, Express, MongoDB, and Shell scripting** that processes large datasets efficiently using checkpointing and automatic recovery.

---

## 📌 Overview

This project demonstrates how modern backend systems handle:

- Long-running jobs  
- System failures  
- Data recovery  
- Job resumption from checkpoints  

### The system allows users to:
- Submit batch jobs  
- Track real-time progress  
- Resume failed jobs from last checkpoint  
- Retrieve final processed results  

---

## 🎯 Key Features

- ✅ Asynchronous Processing (Non-blocking)
- ✅ Checkpoint-Based Resume System
- ✅ MongoDB Job Tracking
- ✅ Fault Tolerance & Recovery
- ✅ Shell Script Automation (`resume.sh`)
- ✅ Real-time Progress Tracking
- ✅ Map-Reduce Inspired Processing

---

## 🛠️ Tech Stack

- **Backend:** Node.js, Express.js  
- **Database:** MongoDB (Mongoose)  
- **Frontend:** HTML, CSS, JavaScript  
- **Scripting:** Bash (Shell Script)  
- **Tools:** Git, VS Code  

---

## ⚙️ System Architecture

The system is divided into multiple layers:

### 1. API Layer (Express Server)
- Handles job submission and tracking

### 2. Processing Layer (Worker)
- Executes batch jobs asynchronously

### 3. Database Layer (MongoDB)
- Stores job status and progress

### 4. Checkpoint System
- Saves progress in `checkpoint.json`

### 5. Recovery System
- Uses shell script to resume jobs

### 6. Frontend
- Displays job status, progress bar, and results

---

## 📂 Project Structure
```bash
batch-processing-project/
│
├── server/
│ ├── app.js # Main Express server (API routes)
│ ├── worker.js # Batch processing logic
│ ├── db.js # MongoDB connection
│ ├── jobModel.js # Mongoose schema
│ └── checkpoint.json # Stores job progress checkpoints
│
├── scripts/
│ └── resume.sh # Script to resume failed jobs
│
├── temp/
│ └── result-<jobId>.txt # Output files
│
├── index.html # Frontend UI
│
├── package.json
└── README.md

```

---

## 🚀 Getting Started

### 🔧 Prerequisites

- Node.js (v16+)
- MongoDB Atlas / Local MongoDB
- Git
- Browser (Chrome recommended)

---

# 🚀 Setup & Installation

## 📥 Clone the Repository

```bash
git clone https://github.com/AnshikaSahu2430/Batch-Processing-System

```

# Navigate to project
```bash
cd Batch-Processing-System
```

# Install dependencies
```bash
npm install
```
## 🔌 Configure Database

### Update MongoDB URI in server/db.js:
```bash
mongoose.connect("your-mongodb-connection-string");
```

##▶️ Run the Project
```bash
node server/app.js
```
Then open:
```bash
index.html
```

# 📡 API Endpoints

| Method | Endpoint        | Description          |
| ------ | --------------- | -------------------- |
| POST   | /submit         | Submit new job       |
| POST   | /start/:id      | Start job processing |
| GET    | /job-status/:id | Get job progress     |
| GET    | /result/:id     | Get final result     |


# 🔄 Resume Failed Jobs

Run the script:
```bash
cd scripts
bash resume.sh
```

✔ Automatically resumes all incomplete jobs from checkpoint.

🔁 Processing Flow
-User submits job
-Job stored in MongoDB
-Worker starts processing
-Progress updated step-by-step
-Checkpoint saved
-If failure occurs → system resumes
-Final result stored in file

# 📊 Example Output

Input:
```bash
[1, 2, 3, 4, 5]
```

Process:
Multiply each element by 2

Output:
```bash
30
```


## ⚠️ Challenges Solved
-Handling asynchronous execution

-Implementing checkpoint system

-Designing recovery mechanism

-Managing file-based intermediate storage

-Maintaining database consistency

## 🚧 Future Improvements

-Distributed workers (scaling)

-Docker containerization

-Cloud deployment (AWS/GCP)

-Message queue integration (Kafka/RabbitMQ)

-Advanced job scheduling

-Real-time monitoring dashboard

## 👨‍💻 Team Roles

Backend Developer – APIs & server logic

Worker Developer – Processing engine

Database Manager – MongoDB & checkpoints

Frontend Developer – UI & API integration

DevOps/Tester – Scripts & testing

## 📜 License

This project is for educational purposes only.

## ⭐ Conclusion

This project demonstrates how real-world backend systems handle failures, ensuring reliability, scalability, and efficiency in large-scale data processing.


