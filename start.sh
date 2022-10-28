#!/bin/bash
echo "Running npm project with Docker. Port open at 3000."
docker run --rm --name ringneck -d -u $(id -u):$(id -g) -p 3000:3000 -v $PWD:/app -w /app node:16 npm run start
docker logs --follow ringneck