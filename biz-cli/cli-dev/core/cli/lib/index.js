const path = require('path');
const userHome = require('user-home');
const colors = require('colors/safe');
const semver = require('semver');
const commander = require('commander');
const pathExists = require('path-exists').sync;

const log = require('@curlyhair-biz-cli-dev/log')
// const init = require('@curlyhair-biz-cli-dev/init');
const exec = require('@curlyhair-biz-cli-dev/exec');
const pkg = require("../package.json");
const constant = require('./const');

let args; // 输入的参数
const program = new commander.Command(); // 单例

async function core() {
  try {
    prepare();
    registerCommand();
    log.verbose('debug', 'test debug log');
  } catch (e) {
    log.error(e.message);
  }
}

// 注册命令
function registerCommand() {
  program
    .name(Object.keys(pkg.bin)[0])
    .usage('<command> [options]')
    .version(pkg.version)
    .option('-tp, --targetPath <targetPath>', '是否指定本地调试文件路径', '')
    .option('-d, --debug', '是否开启调试模式', false);

  program
    .command('init [projectName]')
    .option('-f, --force', '是否强制初始化项目')
    // .option('-tp, --targetPath <targetPath>', '是否指定本地调试文件路径', '')
    .action(exec)

  // 开启debug模式
  program.on('option:debug', function() {
    if (program.opts().debug) {
      process.env.LOG_LEVEL = 'verbose';
    } else {
      process.env.LOG_LEVEL = 'info';
    }
    log.level = process.env.LOG_LEVEL;
  })

  // 指定target path
  program.on('option:targetPath', function() {
    // console.log('program.opts().targetPath:::', program.opts().targetPath);
    process.env.CLI_TARGET_PATH = program.opts().targetPath;
  })

  // 对未知命令的监听
  program.on('command:*', function(obj) {
    const availableCommands = program.commands.map(cmd => cmd.name());
    console.log(colors.red('未知的命令：' + obj[0]));
    if (availableCommands.length > 0) {
      console.log(colors.red('可用命令：' + availableCommands.join(',')));
    }
  });

  program.parse(process.argv);
  // 没有输入任何命令默认显示的内容
  if (program.args && program.args.length < 1) {
    program.outputHelp();
  }
}

// 准备阶段
async function prepare() {
  checkPkgVersion();
  checkRoot();
  checkUserHome();
  checkEnv();
  await checkGlobalUpdate();
}

// 检查node版本号
// function checkNodeVersion() {
//   // 获取当前版本号 - 比对版本号
//   const currentVersion = process.version;
//   const lowestVersion = constant.LOWEST_NODE_VERSION;

//   if (!semver.gte(currentVersion, lowestVersion)) {
//     throw new Error(colors.red(`imooc-cli 需要安装 v${lowestVersion} 以上版本的 Node.js`));
//   }
// }

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
}

// 判断版本号
function checkPkgVersion() {
  log.info("cli-version", pkg.version);
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
