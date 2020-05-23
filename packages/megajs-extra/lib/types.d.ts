/// <reference types="node" />
import { FileOptions, File, DownloadOptions } from 'megajs';
import { Readable } from "stream";
import { SymCryptoKey } from './util';
/**
 * Created by user on 2020/5/24.
 */
declare class FileChildren {
    constructor(options: FileOptions | string);
    static fromURL(options: FileOptions | string): File;
    static unpackAttributes(at: any): JSON;
    name: string;
    attributes: object;
    size: number;
    key: Buffer;
    timestamp: number;
    nodeId: string;
    downloadId: string[];
    directory: boolean;
    children: ReadonlyArray<IFileChildren>;
    parent?: ReadonlyArray<IFileChildren | IFile>;
    loadAttributes(cb?: (err: Error | null, file: IFileChildren) => any): Readable;
    download(options?: DownloadOptions, cb?: any): Readable;
    [SymCryptoKey]?: Buffer;
}
declare class File2 extends File {
    loadAttributes(cb?: (err: Error | null, file: IFile) => any): Readable;
    children: ReadonlyArray<IFileChildren>;
    [SymCryptoKey]?: Buffer;
}
export declare type IFileChildren = FileChildren;
export declare type IFile = File2;
export {};
