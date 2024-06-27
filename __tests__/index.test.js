/* eslint-disable no-undef */
import path, { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import fs from 'node:fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const stylishResult = fs.readFileSync(getFixturePath('stylishResult.txt'), 'utf-8');
const plainResult = fs.readFileSync(getFixturePath('plainResult.txt'), 'utf-8');
const jsonResult = fs.readFileSync(getFixturePath('jsonResult.txt'), 'utf-8');

describe('genDiff', () => {
  test('compare empty json files', () => {
    const emptyJson = getFixturePath('file1.json');

    expect(genDiff(emptyJson, emptyJson))
      .toEqual(`{
}`);
    expect(genDiff(emptyJson, emptyJson, 'stylish'))
      .toEqual(`{
}`);
    expect(genDiff(emptyJson, emptyJson, 'plain'))
      .toEqual('');
    expect(genDiff(emptyJson, emptyJson, 'json'))
      .toEqual('[]');
  });

  test('compare recursive json files', () => {
    const json1 = getFixturePath('file2.json');
    const json2 = getFixturePath('file3.json');

    expect(genDiff(json1, json2))
      .toEqual(stylishResult);
    expect(genDiff(json1, json2, 'stylish'))
      .toEqual(stylishResult);
    expect(genDiff(json1, json2, 'plain'))
      .toEqual(plainResult);
    expect(genDiff(json1, json2, 'json'))
      .toEqual(jsonResult);
  });

  test('compare recursive yaml files', () => {
    const yaml1 = getFixturePath('file1.yml');
    const yaml2 = getFixturePath('file2.yml');

    expect(genDiff(yaml1, yaml2))
      .toEqual(stylishResult);
    expect(genDiff(yaml1, yaml2, 'stylish'))
      .toEqual(stylishResult);
    expect(genDiff(yaml1, yaml2, 'plain'))
      .toEqual(plainResult);
    expect(genDiff(yaml1, yaml2, 'json'))
      .toEqual(jsonResult);
  });
});
