#!/bin/sh
set -e

echo "Running migrations..."
npm run migration:run

echo "Running seeds..."
npm run seed:run

echo "Starting server..."
exec node dist/src/server.js