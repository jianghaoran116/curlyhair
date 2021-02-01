"use strict";

module.exports = core;
const userHome = require('user-home');
const colors = require('colors/safe');
const semver = require('semver');
const pathExists = require('path-exists').sync;

const log = require('@curlyhair-biz-cli-dev/log')
const pkg = require("../package.json");
const constant = require('./const');

function core() {
  try {
    checkPkgVersion();
    checkNodeVersion();
    checkRoot();
    checkUserHome();
  } catch (e) {
    log.error(e.message);
  }
}

// 检查node版本号
function checkNodeVersion() {
  // 获取当前版本号 - 比对版本号
  const currentVersion = process.version;
  const lowestVersion = constant.LOWEST_NODE_VERSION;

  if (!semver.gte(currentVersion, lowestVersion)) {
    throw new Error(colors.red(`imooc-cli 需要安装 v${lowestVersion} 以上版本的 Node.js`));
  }
}

// 判断用户目录
function checkUserHome() {
  if (!userHome || !pathExists(userHome)) {
    throw new Error(colors.red('当前登录用户主目录不存在！'));
  }
}

// 判断用户权限 - 会对root权限进行降级 以免一些文件不能读取导致的问题
function checkRoot() {
  const rootCheck = require('root-check');
  rootCheck();
  console.log(process.geteuid());
}

// 判断版本号
function checkPkgVersion() {
  log.info("cli-version", pkg.version);
}
