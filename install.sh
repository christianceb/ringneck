#!/bin/bash
echo "Running npm install with Docker"
docker run --rm --user $(id -u):$(id -g) -v $PWD:/app -w /app node:16 npm install