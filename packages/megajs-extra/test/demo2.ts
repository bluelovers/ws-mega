/**
 * Created by user on 2020/5/24.
 */
import { fromURL, fromURLExtra } from '../index';
import { SymCryptoKey, megaLinkFromFile, megaFileList } from '../lib/util';

fromURLExtra('https://mega.nz/folder/XtcQECIK#T0iC7WBnho_TOmukXLkE2g/file/epdgUYpJ')
	.then(file => {

		console.dir(file)

	})
;



//api.loadAttributes((error, file) => {
//
//	console.dir(api.key)
//
//	console.dir(api[SymCryptoKey])
//
//	console.dir(file.key)
//
//	console.dir(file.name)
//
////	file.loadAttributes((error, file) => {
////		console.dir(file)
////	})
//
//})
