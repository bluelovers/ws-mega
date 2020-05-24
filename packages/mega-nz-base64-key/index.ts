/**
 * convert buffer to url safe base64 key
 */
export function stringify(buffer: Buffer)
{
	return buffer.toString('base64')
		.replace(/\+/g, '-')
		.replace(/\//g, '_')
		.replace(/=/g, '')
}

/**
 * parse base64 key to buffer
 */
export function parse(key: string)
{
	return Buffer.from(key, 'base64')
}

export default {
	stringify,
	parse,
}
