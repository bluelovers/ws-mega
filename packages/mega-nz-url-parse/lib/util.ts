/**
 * Created by user on 2020/5/24.
 */

export function validDownloadID(file_hash: string)
{
	return /^\w{8,}$/.test(file_hash)
}

export function parseSubPath(paths: string[])
{
	if (!['file', 'folder'].includes(paths[0]))
	{
		throw TypeError(`Invalid URL: ${paths}`)
	}

	const downloadID = paths[1];

	if (!validDownloadID(downloadID))
	{
		throw TypeError(`Invalid URL: not a valid file hash '${downloadID}'`)
	}

	const directory = paths[0] === 'folder';

	return {
		directory,
		downloadID,
	}
}

export function parseLinkHash(hash: string): {
	key: string;
	directory?: never;
	downloadID?: never;
} | {
	key: string;
	directory: boolean;
	downloadID: string;
}
{
	if (hash[0] !== '#')
	{
		throw TypeError(`Invalid URL: invalid hash ${hash}`)
	}

	hash = hash.slice(1);

	const paths = hash.split('/');

	const key = paths[0];

	if (paths.length > 1)
	{
		return {
			...parseSubPath(paths.slice(1)),
			key,
		}
	}
	else
	{
		return {
			key,
		}
	}
}

export function parseLinkHash2(hash: string)
{
	const split = hash.split('!')

	if (split[0] !== '#' && split[0] !== '#F') { throw TypeError(`Invalid URL: format not recognized ${hash}`) }
	if (split.length <= 1) throw TypeError(`Invalid URL: too few arguments ${hash}`)
	if (split.length >= (split[0] === '#' ? 4 : 5)) { throw TypeError(`Invalid URL: too many arguments ${hash}`) }

	const downloadID = split[1];
	const key = split[2];
	const directory = split[0] === '#F';
	const loadedFile = split[3];

	return {
		directory,
		downloadID,
		key,
		loadedFile,
	}
}
