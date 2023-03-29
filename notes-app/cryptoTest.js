const _sodium = require("libsodium-wrappers");
(async() => {
  await _sodium.ready;
  const sodium = _sodium;

  let key = sodium.crypto_secretstream_xchacha20poly1305_keygen();

  let res = sodium.crypto_secretstream_xchacha20poly1305_init_push(key);
  let [state_out, header] = [res.state, res.header];
  let c1 = sodium.crypto_secretstream_xchacha20poly1305_push(state_out,
    sodium.from_string('Privacy is the key that unlocks the aspects of yourself that are most intimate and personal, that make you most you, and most vulnerable. Your naked body. Your sexual history and fantasies. Your past, present and possible future diseases. Your fears, your losses, your failures. The worst thing you have ever done, said, and thought. Your inadequacies, your mistakes, your traumas. The moment in which you have felt most ashamed. That family relation you wish you didn’t have. Your most drunken night. When you give that key, your privacy, to someone who loves you, it will allow you to enjoy closeness, and they will use it to benefit you. Part of what it means to be close to someone is sharing what makes you vulnerable, giving them the power to hurt you, and trusting that person never to take advantage of the privileged position granted by intimacy. People who love you might use your date of birth to organise a surprise birthday party for you; they’ll make a note of your tastes to find you the perfect gift; they’ll take into account your darkest fears to keep you safe from the things that scare you. Not everyone will use access to your personal life in your interest, however. Fraudsters might use your date of birth to impersonate you while they commit a crime; companies might use your tastes to lure you into a bad deal; enemies might use your darkest fears to threaten and extort you. People who don’t have your best interest at heart will exploit your data to further their own agenda. Privacy matters because the lack of it gives others power over you. You might think you have nothing to hide, nothing to fear. You are wrong – unless you are an exhibitionist with masochistic desires of suffering identity theft, discrimination, joblessness, public humiliation and totalitarianism, among other misfortunes. You have plenty to hide, plenty to fear, and the fact that you don’t go around publishing your passwords or giving copies of your home keys to strangers attests to that. You might think your privacy is safe because you are a nobody – nothing special, interesting or important to see here. Don’t shortchange yourself. If you weren’t that important, businesses and governments wouldn’t be going to so much trouble to spy on you.'), null,
    sodium.crypto_secretstream_xchacha20poly1305_TAG_MESSAGE);
  let c2 = sodium.crypto_secretstream_xchacha20poly1305_push(state_out,
    sodium.from_string('message 2'), null,
    sodium.crypto_secretstream_xchacha20poly1305_TAG_FINAL);

  console.log("cipher text 1: ",c1);
  console.log("cipher text 2: ",c2);

  let state_in = sodium.crypto_secretstream_xchacha20poly1305_init_pull(header, key);
  let r1 = sodium.crypto_secretstream_xchacha20poly1305_pull(state_in, c1);
  let [m1, tag1] = [sodium.to_string(r1.message), r1.tag];
  let r2 = sodium.crypto_secretstream_xchacha20poly1305_pull(state_in, c2);
  let [m2, tag2] = [sodium.to_string(r2.message), r2.tag];

  console.log("decoded message 1: ",m1);
  console.log("decoded message 2: ",m2);
})();