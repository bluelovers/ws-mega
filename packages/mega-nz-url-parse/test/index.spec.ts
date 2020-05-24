import parseMegaLink from '../index';

test(`parseMegaLink 01`, () =>
{
	let href = `https://mega.nz/folder/dw4DzZhJ#RNFlsWOf-QTOZJvsMmqLlA/file/5hBUQarQ`

	let actual = parseMegaLink(href);
	let expected;

	//expect(actual).toStrictEqual(expected);
	//expect(actual).toBeInstanceOf(Date);
	expect(actual).toMatchSnapshot();

});

test(`parseMegaLink 02`, () =>
{
	let href = `https://mega.nz/folder/dw4DzZhJ#RNFlsWOf-QTOZJvsMmqLlA`

	let actual = parseMegaLink(href);
	let expected;

	//expect(actual).toStrictEqual(expected);
	//expect(actual).toBeInstanceOf(Date);
	expect(actual).toMatchSnapshot();

});

test(`parseMegaLink 03`, () =>
{
	let href = `https://mega.nz/file/dw4DzZhJ#RNFlsWOf-QTOZJvsMmqLlA`

	let actual = parseMegaLink(href);
	let expected;

	//expect(actual).toStrictEqual(expected);
	//expect(actual).toBeInstanceOf(Date);
	expect(actual).toMatchSnapshot();

});
