import _ from 'lodash';
import parse from './parsers.js';

const findDiff = (obj1, obj2) => {
  const keysObj1 = Object.keys(obj1);
  const keysObj2 = Object.keys(obj2);
  const result = [];

  keysObj1.forEach((key) => {
    const valueObj1 = _.get(obj1, key);
    const valueObj2 = _.get(obj2, key);
    const value1IsObject = typeof valueObj1 === 'object';
    const value2IsObject = typeof valueObj2 === 'object';

    if (value1IsObject && value2IsObject) {
      const subResult = {
        operation: 'nochange',
        path: key,
        children: findDiff(valueObj1, valueObj2),
      };
      result.push(subResult);
    } else if (!_.has(obj2, key)) {
      result.push({
        operation: 'remove',
        path: key,
        value: valueObj1,
      });
    } else if (valueObj1 !== valueObj2) {
      result.push({
        operation: 'update',
        path: key,
        value: valueObj2,
        oldValue: valueObj1,
      });
    } else {
      result.push({
        operation: 'nochange',
        path: key,
        value: valueObj1,
      });
    }
  });

  keysObj2.forEach((key) => {
    if (_.has(obj2, key) && !_.has(obj1, key)) {
      result.push({
        operation: 'add',
        path: key,
        value: _.get(obj2, key),
      });
    }
  });

  return result.sort((item1, item2) => {
    const path1 = item1.path;
    const path2 = item2.path;
    return path1 > path2 ? 1 : -1;
  });
};

const runGendiff = (filepath1, filepath2) => {
  const dataFile1 = parse(filepath1);
  const dataFile2 = parse(filepath2);

  return findDiff(dataFile1, dataFile2);
};

export default runGendiff;
