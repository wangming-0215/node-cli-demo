#!/usr/bin/env node
const commander = require('commander');
const chalk = require('chalk');
const appInfo = require('../package.json');
const fs = require('fs');
const path = require('path');

commander.version(appInfo.version);

commander
  .command('list [dir]')
  .alias('ls')
  .description('list all content under dir')
  .action(readDir);

commander.parse(process.argv);

function readDir(dir) {
  const pathname = dir ? path.resolve(dir) : path.resolve('.');
}
