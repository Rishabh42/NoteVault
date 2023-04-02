const _sodium = require("libsodium-wrappers");
const sodium = _sodium;

function encrypt(key,plaintext) {
    let res = sodium.crypto_secretstream_xchacha20poly1305_init_push(key);
    let c1 = sodium.crypto_secretstream_xchacha20poly1305_push(res.state,
      sodium.from_string(plaintext), null,
      sodium.crypto_secretstream_xchacha20poly1305_TAG_MESSAGE);

    return {res,c1}
}

function decrypt(dKey,ciphertext, header) {
    
    let state_in = sodium.crypto_secretstream_xchacha20poly1305_init_pull(header, dKey);
    let r1 = sodium.crypto_secretstream_xchacha20poly1305_pull(state_in, ciphertext);
    let [m1, tag1] = [sodium.to_string(r1.message), r1.tag];

    return m1;
}

(async() => {
    await _sodium.ready;

    // let key = sodium.crypto_secretstream_xchacha20poly1305_keygen('3bcdebd904aebe2545fb5355d70496b99fb0e93d331a44938b3bdc0abc999a90');
    // let key = '3bcdebd904aebe2545fb5355d70496b99fb0e93d331a44938b3bdc0abc999a90';
    // console.log("key: ",key);
    // let keylength = sodium.crypto_secretstream_xchacha20poly1305_KEYBYTES;
    // console.log("keylength: ",keylength);
    // // let key = '0x689CbCeA23a5E4de84d909eDB8Ae86596a938b6c';

    // let message1 = 'hello';
    // let encryptResp = encrypt(key,message1);
    // let resHeader = encryptResp.res.header;
    // console.log('res: ',encryptResp.res);
    // console.log('c1: ',encryptResp.c1);
    // console.log("header: ", resHeader);

    // let decryptResp = decrypt(key,encryptResp.c1, resHeader)
    // console.log("decryptResp: ",decryptResp);
    // TODO: keygen from public address + salt
    // get user address from web3
})();

module.exports = {encrypt, decrypt};