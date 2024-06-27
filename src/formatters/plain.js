import _ from 'lodash';

const getPrintedValue = (value) => {
  if (!_.isPlainObject(value)) {
    return typeof value !== 'string' ? `${value}` : `'${value}'`;
  }

  return '[complex value]';
};

const plain = (data) => {
  const result = data.map((item) => {
    const {
      children,
      operation,
      path,
      value,
      oldValue,
    } = item;

    if (children) {
      return plain(children.map((child) => _.defaults({ path: `${path}.${child.path}` }, child)));
    }

    if (operation === 'add') {
      return `Property '${path}' was added with value: ${getPrintedValue(value)}`;
    }

    if (operation === 'remove') {
      return `Property '${path}' was removed`;
    }

    if (operation === 'update') {
      return `Property '${path}' was updated. From ${getPrintedValue(oldValue)} to ${getPrintedValue(value)}`;
    }

    return '';
  });

  return _.compact(result).join('\n');
};

export default plain;
