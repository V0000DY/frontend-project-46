import yaml from 'js-yaml';

export default (data, format) => {
  const parsers = {
    json: JSON.parse,
    yaml: yaml.load,
    yml: yaml.load,
  };
  const parse = parsers[format];
  return parse(data);
};
