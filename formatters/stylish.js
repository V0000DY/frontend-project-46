import _ from 'lodash';

const getTab = (tabCount) => {
  const tab = '  '.repeat(tabCount);
  return tab;
};

const getProp = (data, tabCount) => {
  if (typeof data !== 'object' || data === null) return data;

  const keys = Object.keys(data);
  const start = ['{'];
  const end = `${getTab(tabCount - 1)}}`;

  const middle = keys.map((key) => {
    const value = data[key];
    return `${getTab(tabCount)}  ${key}: ${getProp(value, tabCount + 2)}`;
  }).join('\n');

  return [start, middle, end].join('\n');
};

const stylish = (data, tabCount = 1) => {
  const start = ['{'];
  const end = `${getTab(tabCount - 1)}}`;

  const middle = data.map((item) => {
    const {
      children,
      operation,
      path,
      value,
      oldValue,
    } = item;

    if (operation === 'add') {
      return `${getTab(tabCount)}+ ${path}: ${getProp(value, tabCount + 2)}`;
    }

    if (operation === 'remove') {
      return `${getTab(tabCount)}- ${path}: ${getProp(value, tabCount + 2)}`;
    }

    if (operation === 'update') {
      const part1 = `${getTab(tabCount)}- ${path}: ${getProp(oldValue, tabCount + 2)}`;
      const part2 = `${getTab(tabCount)}+ ${path}: ${getProp(value, tabCount + 2)}`;
      return [part1, part2].join('\n');
    }

    if (operation === 'nochange') {
      if (children) {
        return `${getTab(tabCount)}  ${path}: ${stylish(children, tabCount + 2)}`;
      }

      return `${getTab(tabCount)}  ${path}: ${getProp(value, tabCount + 2)}`;
    }

    return '';
  });

  const result = _.compact([start, _.compact(middle).join('\n'), end]);

  return result.join('\n');
};

export default stylish;
