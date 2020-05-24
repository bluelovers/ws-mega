/// <reference types="node" />
/**
 * convert buffer to url safe base64 key
 */
export declare function stringify(buffer: Buffer): string;
/**
 * parse base64 key to buffer
 */
export declare function parse(key: string): Buffer;
declare const _default: {
    stringify: typeof stringify;
    parse: typeof parse;
};
export default _default;
