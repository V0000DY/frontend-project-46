### Hexlet tests and linter status:
[![Actions Status](https://github.com/V0000DY/frontend-project-46/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/V0000DY/frontend-project-46/actions)
# gendiff
"gendiff" is a program that determines the difference between two data structures.
### Utility features:
- Supports different input formats: yaml, json
- Generating a report in the form of plain text, stylish and json
### Usage example:
```bash
# format plain
gendiff --format plain path/to/file.yml another/path/file.json

Property 'common.follow' was added with value: false
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group2' was removed

# format stylish
gendiff filepath1.json filepath2.json

{
  + follow: false
    setting1: Value 1
  - setting2: 200
  - setting3: true
  + setting3: {
        key: value
    }
  + setting4: blah blah
  + setting5: {
        key5: value5
    }
}
```
## Requirements
Node version: 12.19.0
## Install
### Installation via command line
```bash
git clone https://github.com/V0000DY/frontend-project-46.git
cd frontend-project-46
npm install
npm link
```
### Command call
[![asciicast](https://asciinema.org/a/k4W7DDALjIcJc69siMv7NzXFs.svg)](https://asciinema.org/a/k4W7DDALjIcJc69siMv7NzXFs)