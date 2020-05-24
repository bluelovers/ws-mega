"use strict";
/**
 * Created by user on 2020/5/24.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.megaFileList = exports.megaLinkFromFile = exports.megaKeyFromFile = exports.megaKeyBufferFromFile = exports.SymCryptoKey = void 0;
const mega_nz_key_1 = require("mega-nz-key");
exports.SymCryptoKey = Symbol.for('root_key');
function megaKeyBufferFromFile(file) {
    var _a;
    return (_a = file[exports.SymCryptoKey]) !== null && _a !== void 0 ? _a : file.key;
}
exports.megaKeyBufferFromFile = megaKeyBufferFromFile;
function megaKeyFromFile(file) {
    return mega_nz_key_1.stringify(megaKeyBufferFromFile(file));
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
        // @ts-ignore
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