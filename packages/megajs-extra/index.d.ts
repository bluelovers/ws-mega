/**
 * Created by user on 2020/5/24.
 */
import mega, { FileOptions } from 'megajs';
import { megaKeyFromFile, megaFileList } from './lib/util';
import { IFile, IFileChildren } from './lib/types';
export * from 'megajs';
export { IFile, IFileChildren };
export { megaKeyFromFile, megaFileList };
export declare function fromURL(options: FileOptions | string): IFile;
export default mega;