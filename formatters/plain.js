const getPrintedValue = (value) => {
  let printValue;

  if (typeof value !== 'object') {
    printValue = `'${value}'`;
  } else if (value === null) {
    printValue = null;
  } else {
    printValue = '[complex value]';
  }

  return printValue;
};

const plain = (data) => {
  const result = [];

  data.forEach((item) => {
    const {
      children,
      operation,
      path,
      value,
      oldValue,
    } = item;

    switch (operation) {
      case 'add':
        result.push(`Property '${path}' was added with value: ${getPrintedValue(value)}`);
        break;
      case 'remove':
        result.push(`Property '${path}' was removed`);
        break;
      case 'update':
        result.push(`Property '${path}' was updated. From ${getPrintedValue(oldValue)} to ${getPrintedValue(value)}`);
        break;
      case 'nochange':
        if (children) {
          result.push(plain(children.map((child) => {
            // eslint-disable-next-line no-param-reassign
            child.path = `${path}.${child.path}`;
            return child;
          })));
        }
        break;
      default:
        throw Error('Invalid operation in property object!');
    }
  });

  return result.join('\n');
};

export default plain;
