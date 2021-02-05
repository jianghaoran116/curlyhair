const Package = require('@curlyhair-biz-cli-dev/package')

function exec() {
    console.log('exec CLI_TARGET_PATH:::', process.env.CLI_TARGET_PATH);
    // TODO
    const package = new Package();
}

module.exports = exec;
