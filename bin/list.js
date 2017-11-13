const path = require('path');
const fs = require('fs');
const chalk = require('chalk');

async function list(dir = '.') {
  const pathname = path.resolve(dir);
  const files = await readDirs(pathname);
  let output = '';
  files.forEach((file, index) => {
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

module.exports = list;
