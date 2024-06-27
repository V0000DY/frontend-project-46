import _ from 'lodash';

const findDiff = (data1, data2) => {
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
  const keys = _.sortBy(_.union(keys1, keys2));

  const result = keys.map((key) => {
    if (!_.has(data1, key)) {
      return {
        operation: 'add',
        path: key,
        value: _.get(data2, key),
      };
    }

    if (!_.has(data2, key)) {
      return {
        operation: 'remove',
        path: key,
        value: _.get(data1, key),
      };
    }

    const value1 = _.get(data1, key);
    const value2 = _.get(data2, key);
    const value1IsObject = _.isPlainObject(value1);
    const value2IsObject = _.isPlainObject(value2);

    if (value1IsObject && value2IsObject) {
      return {
        operation: 'nochange',
        path: key,
        children: findDiff(value1, value2),
      };
    }

    if (!_.isEqual(value1, value2)) {
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
      value: _.get(data1, key),
    };
  });

  return result;
};

export default findDiff;
