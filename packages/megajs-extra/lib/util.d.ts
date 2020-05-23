/**
 * Created by user on 2020/5/24.
 */
/// <reference types="node" />
import { IFile, IFileChildren } from './types';
export declare const SymCryptoKey: unique symbol;
export declare function e64(buffer: Buffer): string;
export declare function d64(key: string): Buffer;
export declare function megaKeyFromFile(file: IFile | IFileChildren): string;
export declare function megaLinkFromFile(file: IFile | IFileChildren, rootFile: IFile | IFileChildren, options?: {
    gateway?: string;
}): string;
export declare function megaFileList(file: IFile | IFileChildren, options?: {
    rootPath?: string;
    map?: Record<string, IFile | IFileChildren>;
    children?: boolean;
}): Record<string, IFile | IFileChildren>;
