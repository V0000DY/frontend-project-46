import _ from 'lodash';

const stringifyTab = (depth) => {
  const linesTabCount = depth * 4 - 2;
  const bracketTabCount = depth * 4 - 4;
  const linesTab = ' '.repeat(linesTabCount);
  const bracketTab = ' '.repeat(bracketTabCount);
  return { linesTab, bracketTab };
};

const getProp = (data, depth) => {
  if (!_.isPlainObject(data)) return data;

  const keys = Object.keys(data);
  const { linesTab, bracketTab } = stringifyTab(depth);

  const lines = keys.map((key) => {
    const value = data[key];
    return `${linesTab}  ${key}: ${getProp(value, depth + 1)}`;
  });

  return `{\n${lines.join('\n')}\n${bracketTab}}`;
};

const formatStylish = (data, depth = 1) => {
  const { linesTab, bracketTab } = stringifyTab(depth);

  const lines = data.map((item) => {
    const {
      operation,
      key,
    } = item;

    switch (operation) {
      case 'nested': {
        const { children } = item;

        return `${linesTab}  ${key}: ${formatStylish(children, depth + 1)}`;
      }

      case 'add': {
        const { value } = item;

        return `${linesTab}+ ${key}: ${getProp(value, depth + 1)}`;
      }

      case 'remove': {
        const { value } = item;

        return `${linesTab}- ${key}: ${getProp(value, depth + 1)}`;
      }

      case 'update': {
        const {
          value1,
          value2,
        } = item;

        return `${linesTab}- ${key}: ${getProp(value1, depth + 1)}\n${linesTab}+ ${key}: ${getProp(value2, depth + 1)}`;
      }

      case 'nochange': {
        const { value } = item;
        return `${linesTab}  ${key}: ${getProp(value, depth + 1)}`;
      }

      default:
        return '';
    }
  });

  return `{\n${lines.join('\n')}\n${bracketTab}}`;
};

export default formatStylish;
