import yaml from 'js-yaml';

export default (data, format) => {
  const parsers = {
    json: JSON.parse,
    yaml: yaml.load,
    yml: yaml.load,
  };
  const parse = parsers[format];
  if (!parse) throw new Error(`Failed to read the file. Format "${format}" is not supported!`);

  return parse(data);
};
