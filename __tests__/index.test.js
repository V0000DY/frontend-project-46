/* eslint-disable no-undef */
import path, { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import runGendiff from '../src/index.js';
import stylish from '../src/stylish.js';

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
  expect(stylish(runGendiff(path1, path2)))
    .toEqual(`{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`);
  expect(stylish(runGendiff(path2, path1)))
    .toEqual(`{
  + follow: false
    host: hexlet.io
  + proxy: 123.234.53.22
  - timeout: 20
  + timeout: 50
  - verbose: true
}`);
});

test('compareJSONs2', () => {
  expect(stylish(runGendiff(path1, path3)))
    .toEqual(`{
  - follow: false
  - host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
}`);
  expect(stylish(runGendiff(path3, path1)))
    .toEqual(`{
  + follow: false
  + host: hexlet.io
  + proxy: 123.234.53.22
  + timeout: 50
}`);
});

test('compareJSONs3', () => {
  expect(stylish(runGendiff(path3, path4)))
    .toEqual(`{
}`);
});

test('compareJSONs4', () => {
  expect(stylish(runGendiff(path7, path8)))
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
});

test('compareYamls1', () => {
  expect(stylish(runGendiff(path5, path6)))
    .toEqual(`{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`);
  expect(stylish(runGendiff(path6, path5)))
    .toEqual(`{
  + follow: false
    host: hexlet.io
  + proxy: 123.234.53.22
  - timeout: 20
  + timeout: 50
  - verbose: true
}`);
});

test('compareYamls2', () => {
  expect(stylish(runGendiff(path9, path10)))
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
});
