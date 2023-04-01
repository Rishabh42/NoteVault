const _sodium = require("libsodium-wrappers");
 
(async() => {
  await _sodium.ready;
  const sodium = _sodium;

  // TODO: keygen from public address + salt
  let key = sodium.crypto_secretstream_xchacha20poly1305_keygen();
  console.log("key: ",key);
  let res = sodium.crypto_secretstream_xchacha20poly1305_init_push(key);
  
  let [state_out, header] = [res.state, res.header];

  const plaintext = 'hello';

  function encrypt(key,plaintext) {
    let c1 = sodium.crypto_secretstream_xchacha20poly1305_push(state_out,
      sodium.from_string(plaintext), null,
      sodium.crypto_secretstream_xchacha20poly1305_TAG_MESSAGE);

    return c1;
  }

  function decrypt(dKey,ciphertext) {
    let state_in = sodium.crypto_secretstream_xchacha20poly1305_init_pull(header, dKey);
    let r1 = sodium.crypto_secretstream_xchacha20poly1305_pull(state_in, ciphertext);
    let [m1, tag1] = [sodium.to_string(r1.message), r1.tag];

    return m1;
  }

  const cipher1 = encrypt(key,plaintext);
  console.log("cipher text 1: ",cipher1);

  const message1 = decrypt(key,cipher1);
  console.log("decoded message 1: ",message1);
})();