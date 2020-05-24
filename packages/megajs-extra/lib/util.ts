/**
 * Created by user on 2020/5/24.
 */

import { File } from 'megajs';
import { IFile, IFileChildren } from './types';
import { stringify } from 'mega-nz-base64-key';

export const SymCryptoKey = Symbol.for('root_key');

export function megaKeyBufferFromFile(file: IFile | IFileChildren)
{
	return file[SymCryptoKey] ?? file.key
}

export function megaKeyFromFile(file: IFile | IFileChildren)
{
	return stringify(megaKeyBufferFromFile(file))
}

export function megaLinkFromFile(file: IFile | IFileChildren, rootFile: IFile | IFileChildren, options?: {
	gateway?: string,
})
{
	const topkey = megaKeyFromFile(rootFile);

	let downloadId: string;

	if (typeof file.downloadId === 'string')
	{
		downloadId = file.downloadId;
	}
	else
	{
		// @ts-ignore
		downloadId = file.downloadId[file.downloadId.length - 1];
	}

	return new URL(`${options?.gateway ?? `https://mega.nz/`}${(rootFile.directory
		? `folder`
		: `file`)}/${rootFile.downloadId}#${topkey}/${(file.directory ? `folder` : `file`)}/${downloadId}`).href
}

export function megaFileList(file: IFile | IFileChildren, options?: {
	rootPath?: string,
	map?: Record<string, IFile | IFileChildren>,
	children?: boolean,
}): Record<string, IFile | IFileChildren>
{
	let map = options?.map || {};
	let rootPath = (options?.rootPath ?? '') + file.name;

	if (!file.directory)
	{
		map[rootPath] = file;
	}
	else
	{
		if (options?.children)
		{
			rootPath += '/';
		}
		else
		{
			rootPath = '';
		}

		file
			.children
			.forEach((file) =>
		{
			megaFileList(file, {
				rootPath,
				map,
				children: true,
			})
		})
		;
	}

	return map;
}
