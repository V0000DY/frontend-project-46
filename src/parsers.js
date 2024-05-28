import fs from 'node:fs';
import path from 'node:path';
import yaml from 'js-yaml';

export default (filepath) => {
  const normalizedFilePath = path.resolve(filepath);
  const fileFormat = path.extname(normalizedFilePath);
  const data = fs.readFileSync(normalizedFilePath);
  let parse;

  if (fileFormat === 'json') {
    parse = JSON.parse;
  } else {
    parse = yaml.load;
  }
  return parse(data);
};
