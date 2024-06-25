import _ from 'lodash';
import parse from './parsers.js';
import formatters from '../formatters/index.js';

const findDiff = (data1, data2) => {
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
  const keys = _.union(keys1, keys2);

  const result = keys.map((key) => {
    const value1 = _.get(data1, key);
    const value2 = _.get(data2, key);
    const value1IsObject = typeof value1 === 'object';
    const value2IsObject = typeof value2 === 'object';

    if (value1IsObject && value2IsObject) {
      return {
        operation: 'nochange',
        path: key,
        children: findDiff(value1, value2),
      };
    }

    if (_.has(data2, key) && !_.has(data1, key)) {
      return {
        operation: 'add',
        path: key,
        value: _.get(data2, key),
      };
    }

    if (_.has(data1, key) && !_.has(data2, key)) {
      return {
        operation: 'remove',
        path: key,
        value: value1,
      };
    }

    if (value1 !== value2 && _.has(data1, key) && _.has(data2, key)) {
      return {
        operation: 'update',
        path: key,
        value: value2,
        oldValue: value1,
      };
    }

    return {
      operation: 'nochange',
      path: key,
      value: value1,
    };
  });

  return _.sortBy(result, ['path']);
};

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const data1 = parse(filepath1);
  const data2 = parse(filepath2);
  const formatter = formatters[formatName];

  return formatter(findDiff(data1, data2));
};

export default genDiff;
