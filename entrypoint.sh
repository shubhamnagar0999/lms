#!/bin/sh

echo "Waiting for database..."
sleep 5

echo "Running Prisma migrate..."
npx prisma migrate deploy

echo "Running Prisma seed..."
npx prisma db seed

echo "Starting server..."
node dist/server.js