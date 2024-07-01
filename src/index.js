import fs from 'node:fs';
import path from 'node:path';
import parse from './parsers.js';
import formatDiff from './formatters/index.js';
import findDiff from './findDiff.js';

const getData = (filepath) => {
  const normalizedFilePath = path.resolve(filepath);
  const format = path.extname(normalizedFilePath).slice(1);
  const rawData = fs.readFileSync(normalizedFilePath);
  const data = parse(rawData, format);

  return data;
};

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const data1 = getData(filepath1);
  const data2 = getData(filepath2);
  const diff = findDiff(data1, data2);

  return formatDiff(diff, formatName);
};

export default genDiff;
