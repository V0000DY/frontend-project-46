import formatStylish from './stylish.js';
import formatPlain from './plain.js';

const formatDiff = (diff, formatName) => {
  const formatters = {
    stylish: formatStylish,
    plain: formatPlain,
    json: (data) => JSON.stringify(data, null, 2),
    undefined: formatStylish,
  };
  const formatter = formatters[formatName];

  return formatter(diff);
};

export default formatDiff;
