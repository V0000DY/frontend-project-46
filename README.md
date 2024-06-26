### Hexlet tests and linter status:
[![Actions Status](https://github.com/V0000DY/frontend-project-46/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/V0000DY/frontend-project-46/actions)
### Codeclimate status:
[![Maintainability](https://api.codeclimate.com/v1/badges/797a0a3dcc2bf3ce7422/maintainability)](https://codeclimate.com/github/V0000DY/frontend-project-46/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/797a0a3dcc2bf3ce7422/test_coverage)](https://codeclimate.com/github/V0000DY/frontend-project-46/test_coverage)
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

# format json
gendiff --format json filepath3.json filepath4.json

[
  {
    "operation": "remove",
    "path": "follow",
    "value": false
  },
  {
    "operation": "nochange",
    "path": "host",
    "value": "hexlet.io"
  },
  {
    "operation": "remove",
    "path": "proxy",
    "value": "123.234.53.22"
  },
  {
    "operation": "update",
    "path": "timeout",
    "value": 20,
    "oldValue": 50
  },
  {
    "operation": "add",
    "path": "verbose",
    "value": true
  }
]
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
### Command call with *.json files
[![asciicast](https://asciinema.org/a/k4W7DDALjIcJc69siMv7NzXFs.svg)](https://asciinema.org/a/k4W7DDALjIcJc69siMv7NzXFs)
### Command call with *.yml files
[![asciicast](https://asciinema.org/a/dNRbodipKPecFYVdaFjLWD2kf.svg)](https://asciinema.org/a/dNRbodipKPecFYVdaFjLWD2kf)
### Command call with option -f stylish
[![asciicast](https://asciinema.org/a/B4MimLSekujhsEeRr7yl3EJfv.svg)](https://asciinema.org/a/B4MimLSekujhsEeRr7yl3EJfv)
### Command call with option -f plain
[![asciicast](https://asciinema.org/a/ihGIfWZ6OmHlZAtt9708Dx4uc.svg)](https://asciinema.org/a/ihGIfWZ6OmHlZAtt9708Dx4uc)
### Command call with option -f json
[![asciicast](https://asciinema.org/a/5qnHfk2BtclPScM0nTopHVLZR.svg)](https://asciinema.org/a/5qnHfk2BtclPScM0nTopHVLZR)