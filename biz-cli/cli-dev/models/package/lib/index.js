/**
 * 
 */

const path = require('path');
const pkgDir = require('pkg-dir').sync;
const { isObject } = require('@curlyhair-biz-cli-dev/utils');
const formatPath = require('@curlyhair-biz-cli-dev/format-path');

class Package {
    /**
     * 初始化package
     * @param {object} options - 传入的参数
     * options.targetPath - package的路径
     * options.storePath - package的存储路径 缓存路径
     * options.name - package的name
     * optiosn.version - package的版本
     */
    constructor(options) {
        console.log(options)
        if (!options) {
            throw new Error('Package类的options参数不能为空！');
        }
        if (!isObject(options)) {
            throw new Error('Package类的options参数必须为对象！');
        }
        this.targetPath = options.targetPath; // package的目标路径
        this.storeDir = options.storeDir; // 缓存package的路径
        this.packageName = options.packageName; // package的name
        this.packageVersion = options.packageVersion; // package的version
        this.cacheFilePathPrefix = this.packageName.replace('/', '_'); // package的缓存目录前缀
    }

    // 判断当前package是否存在

    // 安装package

    // 更新package

    /**
     * 获取文件入口路径
     * 1. 拿到npm的package.json
     * 2. 读取package.json
     * 3. 获取main或者bing
     * 4. 返回路径 兼容macOS windows
     */
    getRootFilePath() {
        const dir = pkgDir(this.targetPath);

        if (dir) {
            // 读取package.json
            const pkgFile = require(path.resolve(dir, 'package.json'));
            if (pkgFile && pkgFile.main) {
                return formatPath(path.resolve(dir, pkgFile.main));
            }
        }

        return null;
    }
}

module.exports = Package;
