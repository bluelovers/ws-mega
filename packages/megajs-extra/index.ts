/**
 * Created by user on 2020/5/24.
 */

import { Readable } from "stream";
import mega, { File, FileOptions, DownloadOptions } from 'megajs'
import { megaKeyFromFile, d64, SymCryptoKey, megaFileList } from './lib/util';
import { IFile, IFileChildren } from './lib/types';

export * from 'megajs'

export { IFile, IFileChildren }

export { megaKeyFromFile, megaFileList }

const _fromURL = File.fromURL;

export function fromURL(options: FileOptions | string): IFile
{
	const file = _fromURL(options) as any as IFile

	file[SymCryptoKey] = d64(megaKeyFromFile(file));

	return file as any
}

// @ts-ignore
File.fromURL = fromURL;

export default mega
