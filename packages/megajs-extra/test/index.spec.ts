import { d64, e64 } from '../lib/util';

test(`crypto key`, () =>
{
	let key = `RNFlsWOf-QTOZJvsMmqLlA`;

	let actual = d64(key);
	let expected = key;

	expect(e64(actual)).toStrictEqual(expected);
	expect(actual).toMatchSnapshot();
	expect(e64(actual)).toMatchSnapshot();

});

