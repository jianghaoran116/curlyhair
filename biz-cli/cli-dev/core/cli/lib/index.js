"use strict";

const path = require('path');
const userHome = require('user-home');
const colors = require('colors/safe');
const semver = require('semver');
const pathExists = require('path-exists').sync;

const log = require('@curlyhair-biz-cli-dev/log')
const pkg = require("../package.json");
const constant = require('./const');

let args;

async function core() {
  try {
    checkPkgVersion();
    checkNodeVersion();
    checkRoot();
    checkUserHome();
    checkInputArgs();
    checkEnv();
    await checkGlobalUpdate();
    log.verbose('debug', 'test debug log');
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

// 检查入参 - 看看是不是需要进入调试模式
function checkInputArgs() {
  const minimist = require('minimist');
  args = minimist(process.argv.slice(2));
  checkArgs();
}

function checkArgs() {
  if (args.debug) {
    process.env.LOG_LEVEL = 'verbose';
  } else {
    process.env.LOG_LEVEL = 'info';
  }
  log.level = process.env.LOG_LEVEL;
}

function checkEnv() {
  const dotenv = require('dotenv');
  const dotenvPath = path.resolve(userHome, '.env');
  if (pathExists(dotenvPath)) {
    dotenv.config({
      path: dotenvPath,
    });
  }
  createDefaultConfig();
  log.verbose('环境变量', process.env.CLI_HOME_PATH);
}

// 设置默认的环境变量
function createDefaultConfig() {
  const cliConfig = {
    home: userHome,
  };
  if (process.env.CLI_HOME) {
    cliConfig['cliHome'] = path.join(userHome, process.env.CLI_HOME);
  } else {
    cliConfig['cliHome'] = path.join(userHome, constant.DEFAULT_CLI_HOME);
  }
  process.env.CLI_HOME_PATH = cliConfig.cliHome;
}

async function checkGlobalUpdate() {
  const currentVersion = pkg.version;
  const npmName = pkg.name;
  const { getNpmSemverVersion } = require('@curlyhair-biz-cli-dev/get-npm-info');
  const lastVersion = await getNpmSemverVersion(currentVersion, npmName);
  console.log('lastVersion:::', lastVersion)
  if (lastVersion && semver.gt(lastVersion, currentVersion)) {
    log.warn(colors.yellow(`请手动更新 ${npmName}，当前版本：${currentVersion}，最新版本：${lastVersion}
                更新命令： npm install -g ${npmName}`));
  }
}

module.exports = core;
