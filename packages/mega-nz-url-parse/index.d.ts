/**
 * Created by user on 2020/5/24.
 */
import LazyURL from 'lazy-url';
export declare function parseMegaLink(link: string | URL | LazyURL, options?: {
    hostname?: string[];
}): {
    url: LazyURL;
    root: {
        key: string;
        directory: boolean;
        downloadID: string;
        loadedFile?: string;
    };
    sub?: {
        directory: boolean;
        downloadID: string;
    };
};
export default parseMegaLink;
