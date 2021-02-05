/**
 * 
 */
const { isObject } = require('@curlyhair-biz-cli-dev/utils');

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

    // 获取入口文件的路径
}

module.exports = Package;
