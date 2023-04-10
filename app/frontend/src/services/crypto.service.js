/* --------------------------------------------------------------------
This file contains all functions related to encryption and decryption of the notes
Adapted code. Check ACKNOWLEDGEMENTS.md for attribution
----------------------------------------------------------------------- */

export default class Crypto {
    // iterations: It must be a number and should be set as high as possible.
    // So, the more is the number of iterations, the more secure the derived key will be,
    // but in that case it takes greater amount of time to complete.
    // number of interation - the value of 2145 is randomly chosen
    static iteration = 10;

    // algorithm - AES 256 GCM Mode
    static encryptionAlgorithm = "AES-GCM";

    // random initialization vector length
    static ivLength = 12;

    // random salt length
    static saltLength = 16;

    // digest: It is a digest algorithms of string type.
    static digest = "SHA-256";

    // text encoder
    static enc = new TextEncoder();

    // text decoder
    static dec = new TextDecoder();

    /**
     *
     * @param u8
     * @returns
     */
    static base64Encode(u8) {
        return btoa(String.fromCharCode.apply(undefined, [...u8]));
        // return u8.toString('base64');
    }

    /**
     *
     * @param str
     * @returns
     */
    static base64Decode(str) {
        return Uint8Array.from(atob(str), (c) => c.charCodeAt(0));
        //return Buffer.from(str, 'base64');
    }

    /**
     *
     * @param secretKey
     * @returns
     */
    static getPasswordKey(secretKey) {
        return window.crypto.subtle.importKey(
            "raw",
            Crypto.enc.encode(secretKey),
            "PBKDF2",
            false,
            ["deriveKey"]
        );
    }

    /**
     *
     * @param passwordKey
     * @param salt
     * @param iteration
     * @param digest
     * @param encryptionAlgorithm
     * @param keyUsage
     * @returns
     */
    static deriveKey(
        passwordKey,
        salt,
        iteration,
        digest,
        encryptionAlgorithm,
        keyUsage
    ) {
        return window.crypto.subtle.deriveKey(
            {
                name: "PBKDF2",
                salt,
                iterations: iteration,
                hash: digest,
            },
            passwordKey,
            {
                name: encryptionAlgorithm,
                length: 256,
            },
            false,
            keyUsage
        );
    }

    static async encrypt(secretKey, data) {
        try {
            // generate random salt
            const salt = window.crypto.getRandomValues(
                new Uint8Array(Crypto.saltLength)
            );

            // How to transport IV ?
            // Generally the IV is prefixed to the ciphertext or calculated using some kind of nonce on both sides.
            const iv = window.crypto.getRandomValues(new Uint8Array(Crypto.ivLength));

            // create master key from secretKey
            // The method gives an asynchronous Password-Based Key Derivation
            // Create a password based key (PBKDF2) that will be used to derive the AES-GCM key used for encryption
            const passwordKey = await Crypto.getPasswordKey(secretKey);

            // to derive a secret key from a master key for encryption
            // Create an AES-GCM key using the PBKDF2 key and a randomized salt value.
            const aesKey = await Crypto.deriveKey(
                passwordKey,
                salt,
                Crypto.iteration,
                Crypto.digest,
                Crypto.encryptionAlgorithm,
                ["encrypt"]
            );

            // create a Cipher object, with the stated algorithm, key and initialization vector (iv).
            // @algorithm - AES 256 GCM Mode
            // @key
            // @iv
            // @options
            // Encrypt the input data using the AES-GCM key and a randomized initialization vector (iv).
            const encryptedContent = await window.crypto.subtle.encrypt(
                {
                    name: Crypto.encryptionAlgorithm,
                    iv,
                },
                aesKey,
                Crypto.enc.encode(data)
            );

            // convert encrypted string to buffer
            const encryptedContentArr = new Uint8Array(encryptedContent);

            // create buffer array with length [salt + iv + encryptedContentArr]
            const buff = new Uint8Array(
                salt.byteLength + iv.byteLength + encryptedContentArr.byteLength
            );

            // set salt at first postion
            buff.set(salt, 0);

            // set iv at second postion
            buff.set(iv, salt.byteLength);
            // set encrypted at third postion
            buff.set(encryptedContentArr, salt.byteLength + iv.byteLength);
            // encode the buffer array
            const base64Buff = Crypto.base64Encode(buff);

            // return encrypted string
            return base64Buff;
        } catch (error) {
            // if any expection occurs
            console.error(`Error - ${error}`);
            return "";
        }
    }

    static async decrypt(secretKey, ciphertext) {
        try {
            const encryptedDataBuff = Crypto.base64Decode(ciphertext);

            const salt = encryptedDataBuff.slice(0, Crypto.saltLength);
            const iv = encryptedDataBuff.slice(
                Crypto.saltLength,
                Crypto.saltLength + Crypto.ivLength
            );
            const data = encryptedDataBuff.slice(Crypto.saltLength + Crypto.ivLength);

            const passwordKey = await Crypto.getPasswordKey(secretKey);
            const aesKey = await Crypto.deriveKey(
                passwordKey,
                salt,
                Crypto.iteration,
                Crypto.digest,
                Crypto.encryptionAlgorithm,
                ["decrypt"]
            );

            const decryptedContent = await window.crypto.subtle.decrypt(
                {
                    name: Crypto.encryptionAlgorithm,
                    iv: iv,
                },
                aesKey,
                data
            );

            return Crypto.dec.decode(decryptedContent);
        } catch (error) {
            console.error(`Error - ${error}`);
            return "";
        }
    }

}