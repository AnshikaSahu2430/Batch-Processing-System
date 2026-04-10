#!/bin/bash

echo "Resuming jobs from checkpoint..."

CHECKPOINT_FILE="../server/checkpoint.json"

if [ ! -f "$CHECKPOINT_FILE" ]; then
    echo "No checkpoint file found"
    exit 1
fi

# extract job ids
JOB_IDS=$(cat $CHECKPOINT_FILE | grep -o '"[a-z0-9]*"' | tr -d '"')

for jobId in $JOB_IDS
do
    echo "Resuming Job: $jobId"
    
    # 🔥 Windows fix (use curl.exe)
    curl.exe -X POST http://localhost:3000/start/$jobId

done
