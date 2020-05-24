/**
 * Created by user on 2020/5/24.
 */

import LazyURL from 'lazy-url'
import { parseSubPath, parseLinkHash, parseLinkHash2 } from './lib/util';

const defaultHostname = [
	'mega.nz',
	'mega.co.nz',
]

export interface IParseMegaLink
{
	url: LazyURL;
	root: {
		key: string;
		directory: boolean;
		downloadID: string;
		loadedFile?: string;
	};
	sub?: IParseMegaLinkSub;
}

export interface IParseMegaLinkSub
{
	directory: boolean;
	downloadID: string;
}

export function parseMegaLink(link: string | URL | LazyURL, options?: {
	hostname?: string[],
}): IParseMegaLink
{
	options = options ?? {};

	let url: LazyURL = link as any;

	if (!(url instanceof LazyURL))
	{
		url = new LazyURL(url)
	}

	if (!(options.hostname ?? defaultHostname).includes(url.hostname))
	{
		throw TypeError(`Invalid URL: wrong hostname '${url.hostname}'`)
	}

	if (!url.hash) throw TypeError('Invalid URL: no hash');

	if (['file', 'folder'].includes(url.paths[0]))
	{
		const root = parseSubPath(url.paths)

		const { key, directory, downloadID } = parseLinkHash(url.hash);

		if (downloadID)
		{
			return {
				url,
				root: {
					...root,
					key,
				},
				sub: {
					directory,
					downloadID,
				},
			}
		}

		return {
			url,
			root: {
				...root,
				key,
			},
		}
	}
	else
	{
		const root = parseLinkHash2(url.hash);
		return {
			url,
			root,
		}
	}
}

export default parseMegaLink
