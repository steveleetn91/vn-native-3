#!/bin/sh
npm install && npm run build && npm link && npm run setup && npm run add:web && npm run build:web