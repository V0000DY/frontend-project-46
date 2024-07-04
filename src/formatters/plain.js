import _ from 'lodash';

const getPrintedValue = (value) => {
  if (!_.isPlainObject(value)) {
    return typeof value !== 'string' ? `${value}` : `'${value}'`;
  }

  return '[complex value]';
};

const formatPlain = (data) => {
  const result = data.map((item) => {
    const {
      operation,
      key,
    } = item;

    switch (operation) {
      case 'nested': {
        const { children } = item;

        return formatPlain(children.map((child) => _.defaults({ key: `${key}.${child.key}` }, child)));
      }

      case 'add': {
        const { value } = item;

        return `Property '${key}' was added with value: ${getPrintedValue(value)}`;
      }

      case 'remove': {
        return `Property '${key}' was removed`;
      }

      case 'update': {
        const {
          value1,
          value2,
        } = item;

        return `Property '${key}' was updated. From ${getPrintedValue(value1)} to ${getPrintedValue(value2)}`;
      }

      default:
        return '';
    }
  });

  return _.compact(result).join('\n');
};

export default formatPlain;
