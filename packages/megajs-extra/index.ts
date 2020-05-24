/**
 * Created by user on 2020/5/24.
 */

import { Readable } from "stream";
import mega, { File, FileOptions, DownloadOptions } from 'megajs'
import { megaKeyFromFile, SymCryptoKey, megaFileList, filterFileList, applyProxySettings } from './lib/util';
import { IFile, IFileChildren, IFileLike } from './lib/types';
import { parse } from 'mega-nz-key';
import { parseMegaLink, IParseMegaLinkSub } from 'mega-nz-url-parse';

export * from 'megajs'

export { IFile, IFileChildren, IFileLike }

export { megaKeyFromFile, megaFileList }

const _fromURL = File.fromURL;

export function fromURL(options: FileOptions | string): IFile
{
	let file = _fromURL(options) as any as IFile

	let key = parse(megaKeyFromFile(file));

	file[SymCryptoKey] = key;

	return file as any
}

export async function fromURLExtra(options: FileOptions | string, extraOptions?: {
	proxy?,
}): Promise<IFile | IFileChildren>
{
	let sub: IParseMegaLinkSub;

	if (typeof options === 'string')
	{
		let opts = parseMegaLink(options)

		sub = opts.sub;

		options = {
			...opts.root,
			downloadId: opts.root.downloadID,
		}

		//console.dir(options)
	}

	let api = fromURL(options)

	if (extraOptions?.proxy)
	{
		applyProxySettings(api, extraOptions.proxy)
	}

	let file = await new Promise<IFile | IFileChildren>((resolve, reject) =>
	{
		api.loadAttributes((err, file) =>
		{

			if (err)
			{
				reject(err)
			}
			else
			{
				resolve(file)
			}
		})
	});

	if (sub?.downloadID)
	{
		file = filterFileList(megaFileList(file), (filename, file) =>
		{

			const downloadId = Array.isArray(file.downloadId) ? file.downloadId[file.downloadId.length - 1] : file.downloadId

			return downloadId === sub.downloadID
		})[0][1];
	}

	file[SymCryptoKey] = api[SymCryptoKey];

	return file;
}

// @ts-ignore
File.fromURL = fromURL;

export default mega
