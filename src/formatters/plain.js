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
      children,
      operation,
      key,
      value,
      value1,
      value2,
    } = item;

    if (children) {
      return formatPlain(children.map((child) => _.defaults({ key: `${key}.${child.key}` }, child)));
    }

    if (operation === 'add') {
      return `Property '${key}' was added with value: ${getPrintedValue(value)}`;
    }

    if (operation === 'remove') {
      return `Property '${key}' was removed`;
    }

    if (operation === 'update') {
      return `Property '${key}' was updated. From ${getPrintedValue(value1)} to ${getPrintedValue(value2)}`;
    }

    return '';
  });

  return _.compact(result).join('\n');
};

export default formatPlain;
