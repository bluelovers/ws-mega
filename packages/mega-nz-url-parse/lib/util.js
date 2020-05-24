"use strict";
/**
 * Created by user on 2020/5/24.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseLinkHash2 = exports.parseLinkHash = exports.parseSubPath = exports.validDownloadID = void 0;
function validDownloadID(file_hash) {
    return /^\w{8,}$/.test(file_hash);
}
exports.validDownloadID = validDownloadID;
function parseSubPath(paths) {
    if (!['file', 'folder'].includes(paths[0])) {
        throw TypeError(`Invalid URL: ${paths}`);
    }
    const downloadID = paths[1];
    if (!validDownloadID(downloadID)) {
        throw TypeError(`Invalid URL: not a valid file hash '${downloadID}'`);
    }
    const directory = paths[0] === 'folder';
    return {
        directory,
        downloadID,
    };
}
exports.parseSubPath = parseSubPath;
function parseLinkHash(hash) {
    if (hash[0] !== '#') {
        throw TypeError(`Invalid URL: invalid hash ${hash}`);
    }
    hash = hash.slice(1);
    const paths = hash.split('/');
    const key = paths[0];
    if (paths.length > 1) {
        return {
            ...parseSubPath(paths.slice(1)),
            key,
        };
    }
    else {
        return {
            key,
        };
    }
}
exports.parseLinkHash = parseLinkHash;
function parseLinkHash2(hash) {
    const split = hash.split('!');
    if (split[0] !== '#' && split[0] !== '#F') {
        throw TypeError(`Invalid URL: format not recognized ${hash}`);
    }
    if (split.length <= 1)
        throw TypeError(`Invalid URL: too few arguments ${hash}`);
    if (split.length >= (split[0] === '#' ? 4 : 5)) {
        throw TypeError(`Invalid URL: too many arguments ${hash}`);
    }
    const downloadID = split[1];
    const key = split[2];
    const directory = split[0] === '#F';
    const loadedFile = split[3];
    return {
        directory,
        downloadID,
        key,
        loadedFile,
    };
}
exports.parseLinkHash2 = parseLinkHash2;
//# sourceMappingURL=util.js.map