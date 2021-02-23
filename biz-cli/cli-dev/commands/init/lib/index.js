const fs = require("fs");
const requirer = require("inquirer");
const fse = require("fs-extra");
const semver = require('semver');
const Command = require("@curlyhair-biz-cli-dev/command");
const log = require("@curlyhair-biz-cli-dev/log");
const inquirer = require("inquirer");

const TYPE_PROJECT = 'project'; // 用户选择创建的项目类型 - 项目
const TYPE_COMPONENT = 'component'; // 用户选择创建的项目类型 - 组件
class InitCommand extends Command {
    init() {
        this.projectName = this._argv[0] || "";
        this.force = !!this._cmd[1].force;
        log.verbose("projectName", this.projectName);
        log.verbose("force", this.force);
    }

    exec() {
        try {
            // 准备阶段
            this.prepare();
        } catch(e) {
            log.error(e.message);
        }
    }

    async prepare() {
        // 判断当前目录是否为空
        const localPath = process.cwd();

        if (!this.isDirEmpty(localPath)) {
            let isContinue;
            if (!this.force) {
                // console.log('inquiree:::', inquiree);
                isContinue = (await requirer.prompt({
                    type: 'confirm',
                    name: 'isContinue',
                    default: false,
                    message: '当前文件夹不为空，是否继续创建项目?',
                })).isContinue;

                if (!isContinue) { // 用户自己选择不继续后退出安装
                    return;
                }
            }

            if (isContinue || this.force) { // 强制更新
                // 清空当前目录 二次确认
                const { confirmDelete } = await requirer.prompt({
                    type: 'confirm',
                    name: 'confirmDelete',
                    default: false,
                    message: '是否确认清空当前目录下的文件'
                })
                // fse.removeSync();
                fse.emptyDirSync(localPath);
            }
        }

        return this.getProjectInfo();
    }

    /**
     * 
     * @param {*} a 
     * @param {*} b 
     * @return {object} - 项目的基本信息
     */
    async getProjectInfo(a, b) {
        let projectInfo = {};
        // 选择创建项目或组件
        const { type } = await inquirer.prompt({
            type: 'list',
            name: 'type',
            message: '请选择初始化类型',
            default: TYPE_PROJECT,
            choices: [{
                name: '项目',
                value: TYPE_PROJECT,
            }, {
                type: '组件',
                value:TYPE_COMPONENT
            }]
        });
        log.verbose(type);

        if (type === TYPE_PROJECT) { // 选择的是项目
            // 获取项目的基本信息 - 项目名称和版本号
            const project = await inquirer.prompt([
                {
                    type: 'input',
                    name: 'projectName',
                    message: '请输入项目名称',
                    default: '',
                    validate: function(v) {
                        const done = this.async();
                        setTimeout(function() {
                        // 1.首字符必须为英文字符
                        // 2.尾字符必须为英文或数字，不能为字符
                        // 3.字符仅允许"-_"
                        if (!/^[a-zA-Z]+([-][a-zA-Z][a-zA-Z0-9]*|[_][a-zA-Z][a-zA-Z0-9]*|[a-zA-Z0-9])*$/.test(v)) {
                            done('请输入合法的项目名称');
                            return;
                        }
                        done(null, true);
                        }, 0);
                    },
                    filter: function(v) {
                        return v;
                    },
                }, {
                    type: 'input',
                    name: 'projectVersion',
                    message: '请输入项目版本号',
                    default: '1.0.0',
                    validate: function(v) {
                        const done = this.async();
                        setTimeout(function() {
                            if (!(!!semver.valid(v))) {
                            done('请输入合法的版本号');
                            return;
                            }
                            done(null, true);
                        }, 0);
                    },
                    filter: function(v) {
                        if (!!semver.valid(v)) {
                            return semver.valid(v);
                        } else {
                            return v;
                        }
                    },
                }
            ]);

            projectInfo = {
                type,
                ...project,
            };

        } else if (type === TYPE_COMPONENT) {

        }
        log.verbose('projectInfo:::', projectInfo);
        return projectInfo
    }

    isDirEmpty(localPath) {
        // console.log(localPath);
        let fileList = fs.readdirSync(localPath);
        // console.log(fileList);
        // 文件过滤逻辑
        fileList = fileList.filter(filename => (
            !filename.startsWith('.') && ['node_modules'].indexOf(filename) < 0
        ))
        
        return fileList && fileList.length <= 0;
    }
}

function init(...argv) {
    return new InitCommand(argv);
}

module.exports = init;
module.exports.InitCommand = InitCommand;
