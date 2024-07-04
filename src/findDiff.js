import _ from 'lodash';

const findDiff = (data1, data2) => {
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
  const keys = _.sortBy(_.union(keys1, keys2));

  const result = keys.map((key) => {
    if (!_.has(data1, key)) {
      return {
        operation: 'add',
        key,
        value: data2[key],
      };
    }

    if (!_.has(data2, key)) {
      return {
        operation: 'remove',
        key,
        value: data1[key],
      };
    }

    const value1 = data1[key];
    const value2 = data2[key];

    if (_.isPlainObject(value1) && _.isPlainObject(value2)) {
      return {
        operation: 'nested',
        key,
        children: findDiff(value1, value2),
      };
    }

    if (!_.isEqual(value1, value2)) {
      return {
        operation: 'update',
        key,
        value1,
        value2,
      };
    }

    return {
      operation: 'nochange',
      key,
      value: value1,
    };
  });

  return result;
};

export default findDiff;
