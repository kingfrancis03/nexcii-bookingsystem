#!/bin/bash

# Navigate to the directory of the script
cd "$(dirname "$0")"

# Run frontend and backend concurrently
echo "Starting frontend..."
(cd frontend && npm run dev) &

echo "Starting backend with pipenv..."
(cd backend && pipenv run uvicorn app.main:app --reload) &

# Wait for both to finish
wait
