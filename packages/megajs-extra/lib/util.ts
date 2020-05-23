/**
 * Created by user on 2020/5/24.
 */

import { File } from 'megajs';
import { IFile, IFileChildren } from './types';

export const SymCryptoKey = Symbol.for('root_key');

export function e64(buffer: Buffer)
{
	return buffer.toString('base64')
		.replace(/\+/g, '-')
		.replace(/\//g, '_')
		.replace(/=/g, '')
}

export function d64(key: string)
{
	return Buffer.from(key, 'base64')
}

export function megaKeyFromFile(file: IFile | IFileChildren)
{
	return e64(file[SymCryptoKey] ?? file.key)
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
