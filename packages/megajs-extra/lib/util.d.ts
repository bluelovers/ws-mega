/**
 * Created by user on 2020/5/24.
 */
/// <reference types="node" />
import { IFile, IFileChildren, IFileLike } from './types';
export declare const SymCryptoKey: unique symbol;
export declare function megaKeyBufferFromFile(file: IFileLike): Buffer;
export declare function megaKeyFromFile(file: IFileLike): string;
export declare function megaLinkFromFile(file: IFileLike, rootFile: IFileLike, options?: {
    gateway?: string;
}): string;
export declare function megaFileList(file: IFileLike, options?: {
    rootPath?: string;
    map?: Record<string, IFile | IFileChildren>;
    children?: boolean;
}): Record<string, IFile | IFileChildren>;
export declare function filterFileList(listMap: Record<string, IFileLike>, cb: (filename: string, file: IFile | IFileChildren) => boolean): [string, IFile | IFileChildren][];
export declare function applyProxySettings(file: any, proxy: any): any;
export declare function applyProxySettingsCore(api: any, proxy: any): any;
