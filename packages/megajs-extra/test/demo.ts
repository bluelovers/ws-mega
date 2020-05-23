/**
 * Created by user on 2020/5/24.
 */
import { fromURL } from '../index';
import { SymCryptoKey, megaLinkFromFile, megaFileList } from '../lib/util';

const api = fromURL('https://mega.nz/folder/dw4DzZhJ#RNFlsWOf-QTOZJvsMmqLlA')

console.dir(api.key)

api.loadAttributes((error, file) => {

	console.dir(api.key)

	console.dir(api[SymCryptoKey])

	console.dir(file.key)

	console.dir(megaLinkFromFile(file.children[0], api))

	console.dir(megaFileList(file))

//	file.loadAttributes((error, file) => {
//		console.dir(file)
//	})

})
