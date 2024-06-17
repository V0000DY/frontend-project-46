const getTab = (tabCount) => {
  const tab = '  '.repeat(tabCount);
  return tab;
};

const getProp = (data, tabCount) => {
  if (typeof data !== 'object' || data === null) return data;

  const keys = Object.keys(data);
  const result = ['{'];

  keys.forEach((key) => {
    const value = data[key];
    result.push(`${getTab(tabCount)}  ${key}: ${getProp(value, tabCount + 2)}`);
  });

  result.push(`${getTab(tabCount - 1)}}`);

  return result.join('\n');
};

const stylish = (data, tabCount = 1) => {
  const result = ['{'];

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
        result.push(`${getTab(tabCount)}+ ${path}: ${getProp(value, tabCount + 2)}`);
        break;
      case 'remove':
        result.push(`${getTab(tabCount)}- ${path}: ${getProp(value, tabCount + 2)}`);
        break;
      case 'update':
        result.push(`${getTab(tabCount)}- ${path}: ${getProp(oldValue, tabCount + 2)}`);
        result.push(`${getTab(tabCount)}+ ${path}: ${getProp(value, tabCount + 2)}`);
        break;
      case 'nochange':
        if (children) {
          result.push(`${getTab(tabCount)}  ${path}: ${stylish(children, tabCount + 2)}`);
        } else {
          result.push(`${getTab(tabCount)}  ${path}: ${getProp(value, tabCount + 2)}`);
        }
        break;
      default:
        throw Error('Invalid operation in property object!');
    }
  });

  result.push(`${getTab(tabCount - 1)}}`);

  return result.join('\n');
};

export default stylish;
