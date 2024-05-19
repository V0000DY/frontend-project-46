import { program } from 'commander';
import fs from 'node:fs';
import path from 'node:path';
import _ from 'lodash';

const compareFiles = (filepath1, filepath2) => {
  const normalizedFilePath1 = path.resolve(filepath1);
  const normalizedFilePath2 = path.resolve(filepath2);
  const dataFile1 = JSON.parse(fs.readFileSync(normalizedFilePath1));
  const dataFile2 = JSON.parse(fs.readFileSync(normalizedFilePath2));
  const sortedKeysFile1 = Object.keys(dataFile1).sort();
  const unincludedKeysFile2 = _.difference(Object.keys(dataFile2), sortedKeysFile1);

  console.log('{');
  sortedKeysFile1.forEach((key) => {
    const valueFile1 = _.get(dataFile1, key);
    const valueFile2 = _.get(dataFile2, key);
    if (valueFile1 === valueFile2) {
      console.log(`  ${key}: ${valueFile1}`);
    } else if (_.has(dataFile2, key)) {
      console.log(`- ${key}: ${valueFile1}`);
      console.log(`+ ${key}: ${valueFile2}`);
    } else {
      console.log(`- ${key}: ${valueFile1}`);
    }
  });

  unincludedKeysFile2.forEach((key) => {
    const valueFile2 = _.get(dataFile2, key);
    console.log(`+ ${key}: ${valueFile2}`);
  });
  console.log('}');
};

export default () => {
  program
    .name('gendiff')
    .description('Compares two configuration files and shows a difference.')
    .version('0.0.1')
    .argument('<filepath1>', 'path to file 1')
    .argument('<filepath2>', 'path to file 2')
    .option('-f, --format [type]', 'output format')
    .action(compareFiles);

  program.parse();
};
