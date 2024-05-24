import fs from 'node:fs';
import path from 'node:path';
import _ from 'lodash';

const runGendiff = (filepath1, filepath2) => {
  const normalizedFilePath1 = path.resolve(filepath1);
  const normalizedFilePath2 = path.resolve(filepath2);
  const dataFile1 = JSON.parse(fs.readFileSync(normalizedFilePath1));
  const dataFile2 = JSON.parse(fs.readFileSync(normalizedFilePath2));
  const keysFile1 = Object.keys(dataFile1);
  const keysFile2 = Object.keys(dataFile2);
  const sortedUnitedKeys = _.union(keysFile1, keysFile2).sort();
  const result = ['{'];

  sortedUnitedKeys.forEach((key) => {
    const valueFile1 = _.get(dataFile1, key);
    const valueFile2 = _.get(dataFile2, key);
    const hasFile1Key = _.has(dataFile1, key);
    const hasFile2Key = _.has(dataFile2, key);

    if (valueFile1 === valueFile2) {
      result.push(`  ${key}: ${valueFile1}`);
    } else if (hasFile1Key && hasFile2Key) {
      result.push(`- ${key}: ${valueFile1}`);
      result.push(`+ ${key}: ${valueFile2}`);
    } else if (hasFile1Key) {
      result.push(`- ${key}: ${valueFile1}`);
    } else if (hasFile2Key) {
      result.push(`+ ${key}: ${valueFile2}`);
    }
  });

  result.push('}');
  return result.join('\n');
};

export default runGendiff;
