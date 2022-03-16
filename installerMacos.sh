#!/bin/sh
npm install && npm run build && sudo chmod -R 777 ./dist && sudo npm link && npm run setup && npm run add:web && npm run build:web