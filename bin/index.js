#!/usr/bin/env node
const commander = require('commander');
const appInfo = require('../package.json');
const list = require('./list');

commander.version(appInfo.version);

commander
  .command('list [dir]')
  .alias('ls')
  .description('list all content under dir')
  .action(list);

commander.parse(process.argv);
