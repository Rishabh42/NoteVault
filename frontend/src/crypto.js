const _sodium = require("libsodium-wrappers");
const sodium = _sodium;

function encrypt(key,plaintext, state_out) {
    let res = sodium.crypto_secretstream_xchacha20poly1305_init_push(key);
    let c1 = sodium.crypto_secretstream_xchacha20poly1305_push(state_out,
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
  
    // TODO: keygen from public address + salt
    // get user address from web3
})();

module.exports = {encrypt, decrypt};