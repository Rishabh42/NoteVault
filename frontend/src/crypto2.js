"use strict";
console.log("https://github.com/jedisct1/libsodium.js");
const _sodium = require("libsodium-wrappers");
const concatTypedArray = require("concat-typed-array");
(async () => {
	await _sodium.ready;
	const sodium = _sodium;
	const nonceBytes = sodium.crypto_aead_xchacha20poly1305_ietf_NPUBBYTES;
	let key = sodium.from_hex("724b092810ec86d7e35c9d067702b31ef90bc43a7b598626749914d6a3e033ed");
	var nonceTest;

	/**
	 * @param {string} message
	 * @param {string} key
	 * @returns {Uint8Array}
	 */
	function encrypt_and_prepend_nonce(message, key) {
		let nonce = sodium.randombytes_buf(nonceBytes);
		nonceTest = nonce.toString();
		//console.log("nonce", nonce.toString());
		var encrypted = sodium.crypto_aead_xchacha20poly1305_ietf_encrypt(message, null, nonce, nonce, key);
		//console.log("encrypted", encrypted.toString());
		var nonce_and_ciphertext = concatTypedArray(Uint8Array, nonce, encrypted); //https://github.com/jedisct1/libsodium.js/issues/130#issuecomment-361399594
		//console.log("nonce_and_ciphertext", nonce_and_ciphertext, "type", typeof nonce_and_ciphertext);
		//console.log("nonce_and_ciphertext.toString()", nonce_and_ciphertext.toString());
		return nonce_and_ciphertext;
	}

	/**
	 * @param {Uint8Array} nonce_and_ciphertext
	 * @param {string} key
	 * @returns {string}
	 */
	function decrypt_after_extracting_nonce(nonce_and_ciphertext, key) {
		//console.log("nonce_and_ciphertext in decrypt_after_extracting_nonce", nonce_and_ciphertext);
		console.log("nonce_and_ciphertext in decrypt_after_extracting_nonce", nonce_and_ciphertext.toString()); //this matches
		let nonce = nonce_and_ciphertext.slice(0, nonceBytes); //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/slice
		//console.log("nonce after slice", nonce.toString());
		if (nonceTest !== nonce.toString()) {
			console.error("nonce does not match! Original nonce was ", nonceTest);
		}
		let ciphertext = nonce_and_ciphertext.slice(nonceBytes);
		//console.log("ciphertext", ciphertext);
		var result = sodium.crypto_aead_xchacha20poly1305_ietf_decrypt(nonce, ciphertext, null, nonce, key, "text");
		return result;
	}

	/**
	 * @param {string} message
	 * @param {string} key
	 * @returns {string}
	 */
	function encrypt(message, key) {
		var uint8ArrayMsg = encrypt_and_prepend_nonce(message, key);
		//console.log("uint8ArrayMsg", uint8ArrayMsg, "typeof", typeof uint8ArrayMsg);
		//var binary = td.decode(uint8ArrayMsg);//creates a string. https://stackoverflow.com/a/36949791/
		return u_btoa(uint8ArrayMsg); //returns ascii string of garbled text
	}

	/**
	 * @param {string} nonce_and_ciphertext_str
	 * @param {string} key
	 * @returns {string}
	 */
	function decrypt(nonce_and_ciphertext_str, key) {
		//console.log("nonce_and_ciphertext_str", nonce_and_ciphertext_str);
		//var nonce_and_ciphertext = te.encode(nonce_and_ciphertext_str);
		var nonce_and_ciphertext = u_atob(nonce_and_ciphertext_str); //converts ascii string of garbled text into binary
		//console.log("typeof nonce_and_ciphertext", typeof nonce_and_ciphertext);
		//console.log("nonce_and_ciphertext", nonce_and_ciphertext);
		return decrypt_after_extracting_nonce(nonce_and_ciphertext, key);
	}

	function u_atob(ascii) {
		//https://stackoverflow.com/a/43271130/
		return Uint8Array.from(atob(ascii), c => c.charCodeAt(0));
	}

	function u_btoa(buffer) {
		//https://stackoverflow.com/a/43271130/
		var binary = [];
		var bytes = new Uint8Array(buffer);
		for (var i = 0, il = bytes.byteLength; i < il; i++) {
			binary.push(String.fromCharCode(bytes[i]));
		}
		return btoa(binary.join(""));
	}

	var inputStr = "shhh this is a secret";
	console.log("inputStr", inputStr);
	var garbledStr = encrypt(inputStr, key);
	console.log("garbledStr", garbledStr);
	try {
		var decryptedStr = decrypt(garbledStr, key);
		console.log("Recovered input string:", decryptedStr);
		console.log("Check whether the following text matches the original:", decryptedStr === inputStr);
	} catch (e) {
		console.error(e);
	}
})();
