/**
 * Created by user on 2020/5/24.
 */
export declare function validDownloadID(file_hash: string): boolean;
export declare function parseSubPath(paths: string[]): {
    directory: boolean;
    downloadID: string;
};
export declare function parseLinkHash(hash: string): {
    key: string;
    directory?: never;
    downloadID?: never;
} | {
    key: string;
    directory: boolean;
    downloadID: string;
};
export declare function parseLinkHash2(hash: string): {
    directory: boolean;
    downloadID: string;
    key: string;
    loadedFile: string;
};
