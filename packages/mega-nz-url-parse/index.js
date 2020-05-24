"use strict";
/**
 * Created by user on 2020/5/24.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseMegaLink = void 0;
const lazy_url_1 = __importDefault(require("lazy-url"));
const util_1 = require("./lib/util");
const defaultHostname = [
    'mega.nz',
    'mega.co.nz',
];
function parseMegaLink(link, options) {
    var _a;
    options = options !== null && options !== void 0 ? options : {};
    let url = link;
    if (!(url instanceof lazy_url_1.default)) {
        url = new lazy_url_1.default(url);
    }
    if (!((_a = options.hostname) !== null && _a !== void 0 ? _a : defaultHostname).includes(url.hostname)) {
        throw TypeError(`Invalid URL: wrong hostname '${url.hostname}'`);
    }
    if (!url.hash)
        throw TypeError('Invalid URL: no hash');
    if (['file', 'folder'].includes(url.paths[0])) {
        const root = util_1.parseSubPath(url.paths);
        const { key, directory, downloadID } = util_1.parseLinkHash(url.hash);
        if (downloadID) {
            return {
                url,
                root: {
                    ...root,
                    key,
                },
                sub: {
                    directory,
                    downloadID,
                },
            };
        }
        return {
            url,
            root: {
                ...root,
                key,
            },
        };
    }
    else {
        const root = util_1.parseLinkHash2(url.hash);
        return {
            url,
            root,
        };
    }
}
exports.parseMegaLink = parseMegaLink;
exports.default = parseMegaLink;
//# sourceMappingURL=index.js.map