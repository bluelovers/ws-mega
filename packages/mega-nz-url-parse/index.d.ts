/**
 * Created by user on 2020/5/24.
 */
import LazyURL from 'lazy-url';
export interface IParseMegaLink {
    url: LazyURL;
    root: {
        key: string;
        directory: boolean;
        downloadID: string;
        loadedFile?: string;
    };
    sub?: IParseMegaLinkSub;
}
export interface IParseMegaLinkSub {
    directory: boolean;
    downloadID: string;
}
export declare function parseMegaLink(link: string | URL | LazyURL, options?: {
    hostname?: string[];
}): IParseMegaLink;
export default parseMegaLink;
