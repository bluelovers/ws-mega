import { parse, stringify } from '..';

test(`crypto key`, () =>
{
	let key = `RNFlsWOf-QTOZJvsMmqLlA`;

	let actual = parse(key);
	let expected = key;

	expect(stringify(actual)).toStrictEqual(expected);
	expect(actual).toBeInstanceOf(Buffer);
	expect(actual).toMatchSnapshot();
	expect(stringify(actual)).toMatchSnapshot();

});

