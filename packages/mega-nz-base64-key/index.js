"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parse = exports.stringify = void 0;
/**
 * convert buffer to url safe base64 key
 */
function stringify(buffer) {
    return buffer.toString('base64')
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=/g, '');
}
exports.stringify = stringify;
/**
 * parse base64 key to buffer
 */
function parse(key) {
    return Buffer.from(key, 'base64');
}
exports.parse = parse;
exports.default = {
    stringify,
    parse,
};
//# sourceMappingURL=index.js.map