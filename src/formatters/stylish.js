import _ from 'lodash';

const getTab = (depth) => {
  const bodyTabCount = depth * 4 - 2;
  const bracketTabCount = depth * 4 - 4;
  const bodyTab = ' '.repeat(bodyTabCount);
  const bracketTab = ' '.repeat(bracketTabCount);
  return { bodyTab, bracketTab };
};

const getProp = (data, depth) => {
  if (!_.isPlainObject(data)) return data;

  const keys = Object.keys(data);
  const { bodyTab, bracketTab } = getTab(depth);

  const body = keys.map((key) => {
    const value = data[key];
    return `${bodyTab}  ${key}: ${getProp(value, depth + 1)}`;
  }).join('\n');

  const bracket = `${bracketTab}}`;

  return `{
${body}
${bracket}`;
};

const formatStylish = (data, depth = 1) => {
  const { bodyTab, bracketTab } = getTab(depth);

  const body = data.map((item) => {
    const {
      children,
      operation,
      key,
      value,
      value1,
      value2,
    } = item;

    if (operation === 'add') {
      return `${bodyTab}+ ${key}: ${getProp(value, depth + 1)}`;
    }

    if (operation === 'remove') {
      return `${bodyTab}- ${key}: ${getProp(value, depth + 1)}`;
    }

    if (operation === 'update') {
      return `${bodyTab}- ${key}: ${getProp(value1, depth + 1)}
${bodyTab}+ ${key}: ${getProp(value2, depth + 1)}`;
    }

    if (operation === 'nochange') {
      if (children) {
        return `${bodyTab}  ${key}: ${formatStylish(children, depth + 1)}`;
      }

      return `${bodyTab}  ${key}: ${getProp(value, depth + 1)}`;
    }

    return '';
  }).join('\n');

  const bracket = `${bracketTab}}`;

  return `{
${body}
${bracket}`;
};

export default formatStylish;
