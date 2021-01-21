"use strict";

module.exports = core;
const userHome = require('user-home');
const pathExists = require('path-exists').sync;

const log = require('@curlyhair-biz-cli-dev/log')
const pkg = require("../package.json");

function core() {
  checkPkgVersion();
  checkRoot();
  checkUserHome();
}

// 检查node版本号
function checkNodeVersion() {

}

// 判断用户目录
function checkUserHome() {
  console.log('userHome:::', userHome);
  if (!userHome || !pathExists(userHome)) {
    throw new Error(colors.red('当前登录用户主目录不存在！'));
  }
}

// 判断用户权限
function checkRoot() {
  const rootCheck = require('root-check');
  rootCheck();
}

// 判断版本号
function checkPkgVersion() {
  log.info("cli-version", pkg.version);
}
