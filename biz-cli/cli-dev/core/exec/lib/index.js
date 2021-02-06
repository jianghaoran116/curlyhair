const Package = require('@curlyhair-biz-cli-dev/package')

function exec() {
    let targetPath = process.env.CLI_TARGET_PATH;
    const homePath = process.env.CLI_HOME_PATH;
    let storeDir = '';
    let pkg;

    // log.verbose('targetPath', targetPath);
    // log.verbose('homePath', homePath);

    const cmdObj = arguments[arguments.length - 1];
    const cmdName = cmdObj.name();
    const packageName = cmdName;
    const packageVersion = 'latest';

    if (!targetPath) {
        // 生成缓存路径
    }

    const package = new Package({
        targetPath,
        packageName,
        packageVersion,
    });

    console.log('rootfielpath:::', package.getRootFilePath());
}

module.exports = exec;
