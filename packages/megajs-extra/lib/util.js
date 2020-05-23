"use strict";
/**
 * Created by user on 2020/5/24.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.megaFileList = exports.megaLinkFromFile = exports.megaKeyFromFile = exports.d64 = exports.e64 = exports.SymCryptoKey = void 0;
exports.SymCryptoKey = Symbol.for('root_key');
function e64(buffer) {
    return buffer.toString('base64')
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=/g, '');
}
exports.e64 = e64;
function d64(key) {
    return Buffer.from(key, 'base64');
}
exports.d64 = d64;
function megaKeyFromFile(file) {
    var _a;
    return e64((_a = file[exports.SymCryptoKey]) !== null && _a !== void 0 ? _a : file.key);
}
exports.megaKeyFromFile = megaKeyFromFile;
function megaLinkFromFile(file, rootFile, options) {
    var _a;
    const topkey = megaKeyFromFile(rootFile);
    let downloadId;
    if (typeof file.downloadId === 'string') {
        downloadId = file.downloadId;
    }
    else {
        // @ts-ignore
        downloadId = file.downloadId[file.downloadId.length - 1];
    }
    return new URL(`${(_a = options === null || options === void 0 ? void 0 : options.gateway) !== null && _a !== void 0 ? _a : `https://mega.nz/`}${(rootFile.directory
        ? `folder`
        : `file`)}/${rootFile.downloadId}#${topkey}/${(file.directory ? `folder` : `file`)}/${downloadId}`).href;
}
exports.megaLinkFromFile = megaLinkFromFile;
function megaFileList(file, options) {
    var _a;
    let map = (options === null || options === void 0 ? void 0 : options.map) || {};
    let rootPath = ((_a = options === null || options === void 0 ? void 0 : options.rootPath) !== null && _a !== void 0 ? _a : '') + file.name;
    if (!file.directory) {
        map[rootPath] = file;
    }
    else {
        if (options === null || options === void 0 ? void 0 : options.children) {
            rootPath += '/';
        }
        else {
            rootPath = '';
        }
        file
            .children
            .forEach((file) => {
            megaFileList(file, {
                rootPath,
                map,
                children: true,
            });
        });
    }
    return map;
}
exports.megaFileList = megaFileList;
//# sourceMappingURL=util.js.map