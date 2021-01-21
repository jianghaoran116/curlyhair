#! /usr/bin/env node

const importlocal = require('import-local');

if (importlocal(__filename)) {
  require('npmlog').info('cli', '正在使用import-local本地版本')
} else {
  require('../lib')(process.argv.slice(2));
}
