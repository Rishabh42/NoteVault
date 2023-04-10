/* --------------------------------------------------------------------
This file contains all routes related to authentication with Metamask
Adapted code. Check ACKNOWLEDGEMENTS.md for attribution
----------------------------------------------------------------------- */

import express from "express";
import { recoverPersonalSignature } from 'eth-sig-util';
import { bufferToHex } from 'ethereumjs-util';
import jwt from 'jsonwebtoken';
import { User } from "../../models/user.model.js";

export const authRouter = express.Router();

/**
 * POST /api/auth
 * @summary This endpoint verifies the digital signature of the nonce with the Metamask public address of the user and returns a JWT
 * @param {object} request.body.required - {signature, publicAddress}
 * @return {object} 200 - Sucess. JWT stored in HTTP-only cookie and sent to client
 * @return {object} xxx - Error. Error is passed to next handler
 */
authRouter.post('/', async (req, res, next) => {
    const { signature, publicAddress } = req.body;
    if (!signature || !publicAddress)
        return res
            .status(400)
            .send({ error: 'Request should have signature and publicAddress' });

    return (
        User.findOne({ publicAddress: publicAddress })
            ////////////////////////////////////////////////////
            // Step 1: Get the user with the given publicAddress
            ////////////////////////////////////////////////////
            .then((user) => {
                if (!user) {
                    res.status(401).send({
                        error: `User with publicAddress ${publicAddress} is not found in database`,
                    });

                    return null;
                }

                return user;
            })
            ////////////////////////////////////////////////////
            // Step 2: Verify digital signature
            ////////////////////////////////////////////////////
            .then((user) => {
                if (!(user instanceof User)) {
                    // Should not happen, we should have already sent the response
                    throw new Error(
                        'User is not defined in "Verify digital signature".'
                    );
                }

                const msg = `I am signing my one-time nonce: ${user.nonce}`;

                // We now are in possession of msg, publicAddress and signature. We
                // will use a helper from eth-sig-util to extract the address from the signature
                const msgBufferHex = bufferToHex(Buffer.from(msg, 'utf8'));
                const address = recoverPersonalSignature({
                    data: msgBufferHex,
                    sig: signature,
                });

                // The signature verification is successful if the address found with
                // sigUtil.recoverPersonalSignature matches the initial publicAddress
                if (address.toLowerCase() === publicAddress.toLowerCase()) {
                    return user;
                } else {
                    res.status(401).send({
                        error: 'Signature verification failed',
                    });

                    return null;
                }
            })
            ////////////////////////////////////////////////////
            // Step 3: Generate a new nonce for the user
            ////////////////////////////////////////////////////
            .then((user) => {
                if (!(user instanceof User)) {
                    // Should not happen, we should have already sent the response

                    throw new Error(
                        'User is not defined in "Generate a new nonce for the user".'
                    );
                }

                user.nonce = Math.floor(Math.random() * 10000);
                return user.save();
            })
            ////////////////////////////////////////////////////
            // Step 4: Create JWT
            ////////////////////////////////////////////////////
            .then((user) => {
                return new Promise((resolve, reject) =>
                    // https://github.com/auth0/node-jsonwebtoken
                    jwt.sign(
                        {
                            payload: {
                                id: user.id,
                                publicAddress,
                            },
                        },
                        process.env.JWT_SECRET,
                        {
                            algorithm: process.env.JWT_ALGORITHM,
                        },
                        (err, token) => {
                            if (err) {
                                return reject(err);
                            }
                            if (!token) {
                                return new Error('Empty token');
                            }
                            return resolve(token);
                        }
                    )
                );
            })
            .then((accessToken) => res.cookie("jwt", accessToken, { httpOnly: true, maxAge: 3600000 }).send())
            .catch(next)
    );
})

/**
 * GET /api/auth/logout
 * @summary This endpoint removes the JWT cookie and ends the user session
 * @return {object} 202 - Accepted. Sends message to client indicating log out successful
 * @return {object} 500 - Internal Server Error. 
 */
authRouter.get('/logout', (req, res) => {
    try {
        res.status(202).clearCookie('jwt').json({ message: 'Logged out successfully' })
    } catch {
        res.status(500).json({ error: 'Error logging out' })
    }
})