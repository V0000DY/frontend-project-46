#!/usr/bin/env node
import { program } from 'commander';
import runGendiff from '../src/index.js';

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1')
  .argument('<filepath1>', 'path to file 1')
  .argument('<filepath2>', 'path to file 2')
  .option('-f, --format [type]', 'output format')
  .action((filepath1, filepath2) => {
    console.log(runGendiff(filepath1, filepath2));
  });

program.parse();
