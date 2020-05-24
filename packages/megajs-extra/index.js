"use strict";
/**
 * Created by user on 2020/5/24.
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fromURLExtra = exports.fromURL = exports.megaFileList = exports.megaKeyFromFile = void 0;
const megajs_1 = __importStar(require("megajs"));
const util_1 = require("./lib/util");
Object.defineProperty(exports, "megaKeyFromFile", { enumerable: true, get: function () { return util_1.megaKeyFromFile; } });
Object.defineProperty(exports, "megaFileList", { enumerable: true, get: function () { return util_1.megaFileList; } });
const mega_nz_key_1 = require("mega-nz-key");
const mega_nz_url_parse_1 = require("mega-nz-url-parse");
__exportStar(require("megajs"), exports);
const _fromURL = megajs_1.File.fromURL;
function fromURL(options) {
    let file = _fromURL(options);
    let key = mega_nz_key_1.parse(util_1.megaKeyFromFile(file));
    file[util_1.SymCryptoKey] = key;
    return file;
}
exports.fromURL = fromURL;
async function fromURLExtra(options) {
    let sub;
    if (typeof options === 'string') {
        let opts = mega_nz_url_parse_1.parseMegaLink(options);
        sub = opts.sub;
        options = {
            ...opts.root,
            downloadId: opts.root.downloadID,
        };
        //console.dir(options)
    }
    let api = fromURL(options);
    if (sub.downloadID) {
        let file = await new Promise((resolve, reject) => {
            api.loadAttributes((err, file) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(file);
                }
            });
        });
        file = util_1.filterFileList(util_1.megaFileList(file), (filename, file) => {
            const downloadId = Array.isArray(file.downloadId) ? file.downloadId[file.downloadId.length - 1] : file.downloadId;
            return downloadId === sub.downloadID;
        })[0][1];
        file[util_1.SymCryptoKey] = api[util_1.SymCryptoKey];
        return file;
    }
    return api;
}
exports.fromURLExtra = fromURLExtra;
// @ts-ignore
megajs_1.File.fromURL = fromURL;
exports.default = megajs_1.default;
//# sourceMappingURL=index.js.map