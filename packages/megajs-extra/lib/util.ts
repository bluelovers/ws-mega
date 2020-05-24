/**
 * Created by user on 2020/5/24.
 */

import { File } from 'megajs';
import { IFile, IFileChildren, IFileLike } from './types';
import { stringify } from 'mega-nz-key';
import { extname } from "path";

export const SymCryptoKey = Symbol.for('root_key');

export function megaKeyBufferFromFile(file: IFileLike): Buffer
{
	return file[SymCryptoKey] ?? file.key
}

export function megaKeyFromFile(file: IFileLike): string
{
	return stringify(megaKeyBufferFromFile(file))
}

export function megaLinkFromFile(file: IFileLike, rootFile: IFileLike, options?: {
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

export function megaFileList(file: IFileLike, options?: {
	rootPath?: string,
	map?: Record<string, IFile | IFileChildren>,
	children?: boolean,
}): Record<string, IFile | IFileChildren>
{
	let map = options?.map || {};
	let rootPath = (options?.rootPath ?? '') + file.name;

	if (!file.directory)
	{
		// @ts-ignore
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

		map[rootPath + (rootPath.endsWith('/') ? '' : '/')] = file as any;

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

export function filterFileList(listMap: Record<string, IFileLike>, cb: (filename: string, file: IFile | IFileChildren) => boolean): [string, IFile | IFileChildren][]
{
	return Object.entries(listMap)
		.reduce((map, [filename, file]) =>
		{
			if (cb(filename, file as any))
			{
				map.push([filename, file as any])
			}
			return map;
		}, [] as [string, IFile | IFileChildren][])
}
