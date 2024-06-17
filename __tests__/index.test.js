/* eslint-disable no-undef */
import path, { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const path1 = getFixturePath('file1.json');
const path2 = getFixturePath('file2.json');
const path3 = getFixturePath('file3.json');
const path4 = getFixturePath('file4.json');
const path5 = getFixturePath('file1.yml');
const path6 = getFixturePath('file2.yml');
const path7 = getFixturePath('file5.json');
const path8 = getFixturePath('file6.json');
const path9 = getFixturePath('file3.yml');
const path10 = getFixturePath('file4.yml');

test('compareJSONs1', () => {
  expect(genDiff(path1, path2, 'stylish'))
    .toEqual(`{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`);
  expect(genDiff(path2, path1, 'stylish'))
    .toEqual(`{
  + follow: false
    host: hexlet.io
  + proxy: 123.234.53.22
  - timeout: 20
  + timeout: 50
  - verbose: true
}`);
  expect(genDiff(path1, path2, 'plain'))
    .toEqual(`Property 'follow' was removed
Property 'proxy' was removed
Property 'timeout' was updated. From '50' to '20'
Property 'verbose' was added with value: 'true'`);
  expect(genDiff(path2, path1, 'plain'))
    .toEqual(`Property 'follow' was added with value: 'false'
Property 'proxy' was added with value: '123.234.53.22'
Property 'timeout' was updated. From '20' to '50'
Property 'verbose' was removed`);
});

test('compareJSONs2', () => {
  expect(genDiff(path1, path3, 'stylish'))
    .toEqual(`{
  - follow: false
  - host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
}`);
  expect(genDiff(path3, path1, 'stylish'))
    .toEqual(`{
  + follow: false
  + host: hexlet.io
  + proxy: 123.234.53.22
  + timeout: 50
}`);
  expect(genDiff(path1, path3, 'plain'))
    .toEqual(`Property 'follow' was removed
Property 'host' was removed
Property 'proxy' was removed
Property 'timeout' was removed`);
  expect(genDiff(path3, path1, 'plain'))
    .toEqual(`Property 'follow' was added with value: 'false'
Property 'host' was added with value: 'hexlet.io'
Property 'proxy' was added with value: '123.234.53.22'
Property 'timeout' was added with value: '50'`);
});

test('compareJSONs3', () => {
  expect(genDiff(path3, path4, 'stylish'))
    .toEqual(`{
}`);
  expect(genDiff(path3, path4, 'plain'))
    .toEqual('');
});

test('compareJSONs4', () => {
  expect(genDiff(path7, path8, 'stylish'))
    .toEqual(`{
    common: {
      + follow: false
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: null
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
        setting6: {
            doge: {
              - wow: 
              + wow: so much
            }
            key: value
          + ops: vops
        }
    }
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
        deep: {
            id: 45
        }
    }
  + group3: {
        deep: {
            id: {
                number: 45
            }
        }
        fee: 100500
    }
}`);
  expect(genDiff(path7, path8, 'plain'))
    .toEqual(`Property 'common.follow' was added with value: 'false'
Property 'common.setting2' was removed
Property 'common.setting3' was updated. From 'true' to null
Property 'common.setting4' was added with value: 'blah blah'
Property 'common.setting5' was added with value: [complex value]
Property 'common.setting6.doge.wow' was updated. From '' to 'so much'
Property 'common.setting6.ops' was added with value: 'vops'
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group1.nest' was updated. From [complex value] to 'str'
Property 'group2' was removed
Property 'group3' was added with value: [complex value]`);
});

test('compareYamls1', () => {
  expect(genDiff(path5, path6, 'stylish'))
    .toEqual(`{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`);
  expect(genDiff(path6, path5, 'stylish'))
    .toEqual(`{
  + follow: false
    host: hexlet.io
  + proxy: 123.234.53.22
  - timeout: 20
  + timeout: 50
  - verbose: true
}`);
  expect(genDiff(path5, path6, 'plain'))
    .toEqual(`Property 'follow' was removed
Property 'proxy' was removed
Property 'timeout' was updated. From '50' to '20'
Property 'verbose' was added with value: 'true'`);
  expect(genDiff(path6, path5, 'plain'))
    .toEqual(`Property 'follow' was added with value: 'false'
Property 'proxy' was added with value: '123.234.53.22'
Property 'timeout' was updated. From '20' to '50'
Property 'verbose' was removed`);
});

test('compareYamls2', () => {
  expect(genDiff(path9, path10, 'stylish'))
    .toEqual(`{
    common: {
      + follow: false
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: null
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
        setting6: {
            doge: {
              - wow: 
              + wow: so much
            }
            key: value
          + ops: vops
        }
    }
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
        deep: {
            id: 45
        }
    }
  + group3: {
        deep: {
            id: {
                number: 45
            }
        }
        fee: 100500
    }
}`);
  expect(genDiff(path9, path10, 'plain'))
    .toEqual(`Property 'common.follow' was added with value: 'false'
Property 'common.setting2' was removed
Property 'common.setting3' was updated. From 'true' to null
Property 'common.setting4' was added with value: 'blah blah'
Property 'common.setting5' was added with value: [complex value]
Property 'common.setting6.doge.wow' was updated. From '' to 'so much'
Property 'common.setting6.ops' was added with value: 'vops'
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group1.nest' was updated. From [complex value] to 'str'
Property 'group2' was removed
Property 'group3' was added with value: [complex value]`);
});
