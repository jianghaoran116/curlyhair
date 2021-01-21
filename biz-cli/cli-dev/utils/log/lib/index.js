"use strict";

const log = require("npmlog");

// 判断debug模式
// biz-cli-dev --debug | LOG_LEVEL = verbose
log.level = process.env.LOG_LEVEL ? process.env.LOG_LEVEL : 'info';

// 修改前缀
log.heading = "biz-cli-dev";

// 添加自定义命令
log.addLevel("success", 2000, {
  fg: "green",
  bold: true,
});

module.exports = log;
