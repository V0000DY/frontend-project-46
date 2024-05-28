/* eslint-disable no-undef */
import path, { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import runGendiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const path1 = getFixturePath('file1.json');
const path2 = getFixturePath('file2.json');
const path3 = getFixturePath('file3.json');
const path4 = getFixturePath('file4.json');
const path5 = getFixturePath('file1.yml');
const path6 = getFixturePath('file2.yml');

test('compareJSONs1', () => {
  expect(runGendiff(path1, path2))
    .toEqual(`{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`);
  expect(runGendiff(path2, path1))
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
  expect(runGendiff(path1, path3))
    .toEqual(`{
  - follow: false
  - host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
}`);
  expect(runGendiff(path3, path1))
    .toEqual(`{
  + follow: false
  + host: hexlet.io
  + proxy: 123.234.53.22
  + timeout: 50
}`);
});

test('compareJSONs3', () => {
  expect(runGendiff(path3, path4))
    .toEqual(`{
}`);
});

test('compareYamls1', () => {
  expect(runGendiff(path5, path6))
    .toEqual(`{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`);
  expect(runGendiff(path6, path5))
    .toEqual(`{
  + follow: false
    host: hexlet.io
  + proxy: 123.234.53.22
  - timeout: 20
  + timeout: 50
  - verbose: true
}`);
});
