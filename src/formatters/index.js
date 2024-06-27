import stylish from './stylish.js';
import plain from './plain.js';

const formatters = {
  stylish,
  plain,
  json: (data) => JSON.stringify(data, null, 2),
  undefined: stylish,
};

export default formatters;