/**
 * 
 */
const path = require('path');
const fse = require('fs-extra');
const pkgDir = require('pkg-dir').sync;
const pathExists = require('path-exists').sync;
const npminstall = require('npminstall');
const { isObject } = require('@curlyhair-biz-cli-dev/utils');
const formatPath = require('@curlyhair-biz-cli-dev/format-path');
const { getDefaultRegistry, getNpmLatestVersion } = require('@curlyhair-biz-cli-dev/get-npm-info');

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

    async prepare() {
        if (this.storeDir && !pathExists(this.storeDir)) {
            fse.mkdirpSync(this.storeDir);
        }
        if (this.packageVersion === 'latest') {
            this.packageVersion = await getNpmLatestVersion(this.packageName);
        }
    }

    // 判断当前Package是否存在
    async exists() {
        if (this.storeDir) {
        await this.prepare();
        return pathExists(this.cacheFilePath);
        } else {
        return pathExists(this.targetPath);
        }
    }

    // 安装package
    async install() {
        await this.prepare();
        return npminstall({
        root: this.targetPath,
        storeDir: this.storeDir,
        registry: getDefaultRegistry(),
        pkgs: [{
            name: this.packageName,
            version: this.packageVersion,
        }],
        });
    }

    // 更新package
    async update() {
        await this.prepare();
        // 1. 获取最新的npm模块版本号
        const latestPackageVersion = await getNpmLatestVersion(this.packageName);
        // 2. 查询最新版本号对应的路径是否存在
        const latestFilePath = this.getSpecificCacheFilePath(latestPackageVersion);
        // 3. 如果不存在，则直接安装最新版本
        if (!pathExists(latestFilePath)) {
        await npminstall({
            root: this.targetPath,
            storeDir: this.storeDir,
            registry: getDefaultRegistry(),
            pkgs: [{
            name: this.packageName,
            version: latestPackageVersion,
            }],
        });
        this.packageVersion = latestPackageVersion;
        }
    }

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
