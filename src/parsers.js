import fs from 'node:fs';
import path from 'node:path';
import yaml from 'js-yaml';

const parsers = {
  '.json': JSON.parse,
  '.yaml': yaml.load,
  '.yml': yaml.load,
};

export default (filepath) => {
  const normalizedFilePath = path.resolve(filepath);
  const fileFormat = path.extname(normalizedFilePath);
  const data = fs.readFileSync(normalizedFilePath);
  const parse = parsers[fileFormat];
  return parse(data);
};
