#!/usr/bin/env node
let cli = require('cli');
const fs = require('fs')
require('dotenv').config()
const frameworkInfo = './framework.json';
try {
    if (fs.existsSync(frameworkInfo)) {
        cli.ok("Start electron build");
    }
}catch(e){
    cli.error(err.toString());
}