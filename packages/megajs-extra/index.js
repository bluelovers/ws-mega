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
exports.fromURL = exports.megaFileList = exports.megaKeyFromFile = void 0;
const megajs_1 = __importStar(require("megajs"));
const util_1 = require("./lib/util");
Object.defineProperty(exports, "megaKeyFromFile", { enumerable: true, get: function () { return util_1.megaKeyFromFile; } });
Object.defineProperty(exports, "megaFileList", { enumerable: true, get: function () { return util_1.megaFileList; } });
const mega_nz_key_1 = require("mega-nz-key");
__exportStar(require("megajs"), exports);
const _fromURL = megajs_1.File.fromURL;
function fromURL(options) {
    const file = _fromURL(options);
    file[util_1.SymCryptoKey] = mega_nz_key_1.parse(util_1.megaKeyFromFile(file));
    return file;
}
exports.fromURL = fromURL;
// @ts-ignore
megajs_1.File.fromURL = fromURL;
exports.default = megajs_1.default;
//# sourceMappingURL=index.js.map