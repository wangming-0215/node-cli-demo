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
  .action(list);

commander.parse(process.argv);

async function list(dir = '.') {
  const pathname = path.resolve(dir);
  const files = await readDirs(pathname);
  let output = '';
  files.forEach(file => {
    const filename = path.join(pathname, file);
    try {
      const stat = fs.statSync(filename);
      if (stat.isDirectory()) {
        output += chalk.cyan(file) + '  ';
      } else {
        output += file + '  ';
      }
    } catch (e) {
      output += chalk.bgRed(file) + '  ';
    }
  });
  console.log(output);
}

function readDirs(path) {
  return new Promise((resolve, reject) => {
    fs.readdir(path, (err, files) => {
      if (err) {
        reject(new Error(err));
      } else {
        resolve(files);
      }
    });
  });
}

function fileStat(path) {
  return new Promise((resolve, reject) => {
    fs.stat(path, (err, stat) => {
      if (err) {
        reject(err);
      } else {
        resolve(stat);
      }
    });
  });
}
