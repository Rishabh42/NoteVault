/* --------------------------------------------------------------------
This file contains all code related to authentication with Metamask
Adapted code. Check ACKNOWLEDGEMENTS.md for attribution
----------------------------------------------------------------------- */
import Web3 from 'web3';
import axios from "../axios";

let web3 = undefined;

/**
 * This function sends the signature along with the public Metamask address of the user to the backend for verification
 * @param {{publicAddress: string, signature: number}} param0 object containing public Metamask address of user and randomly generated nonce
 * @returns 
 */
const handleAuthenticate = ({
    publicAddress,
    signature,
}) =>
    axios.post('/auth', { publicAddress, signature }, {
        headers: {
            'Content-Type': 'application/json',
        },
    }).then((response) => response);

/**
 * This function pops up the Metamask confirmation modal to sign the nonce with the public Metamask address of user
 * @param {{publicAddress: string, nonce: number}} param0 object containing public Metamask address of user and randomly generated nonce
 * @returns 
 */
const handleSignMessage = async ({
    publicAddress,
    nonce,
}) => {
    try {
        const signature = await web3.eth.personal.sign(
            `I am signing my one-time nonce: ${nonce}`,
            publicAddress,
            '' // MetaMask will ignore the password argument here
        );

        return { publicAddress, signature };
    } catch (err) {
        throw new Error(
            'You need to sign the message to be able to log in.'
        );
    }
};

/**
 * This function creates a user with the given public Metamask address in the database
 * @param {string} publicAddress public Metamask address of user
 * @returns 
 */
const handleSignup = (publicAddress) =>
    axios.post('/users', { publicAddress }, {
        headers: {
            'Content-Type': 'application/json',
        },
    }).then((response) => response);



/**
 * Main authentication function that verifies the identity of an existing user or creates a new user if no account is found.
 * @returns 
 */
export const authenticate = async () => {
    // Check if MetaMask is installed
    if (!window.ethereum) {
        window.alert('Please install MetaMask first.');
        return;
    }

    if (!web3) {
        try {
            // Request account access if needed
            await window.ethereum.request({
                method: "eth_requestAccounts",
            });


            // We don't know window.web3 version, so we use our own instance of Web3
            // with the injected provider given by MetaMask
            web3 = new Web3(window.ethereum);
        } catch (error) {
            window.alert('You need to allow MetaMask.');
            return;
        }
    }

    const coinbase = await web3.eth.getCoinbase();
    if (!coinbase) {
        window.alert('Please activate MetaMask first.');
        return;
    }

    const publicAddress = coinbase.toLowerCase();

    // Look if user with current publicAddress is already present on backend
    return axios.get(
        `/users?publicAddress=${publicAddress}`
    )
        // If yes, retrieve it. If no, create it.
        .then((response) =>
            response.data.users.length ? response.data.users[0] : handleSignup(publicAddress)

        )
        // Popup MetaMask confirmation modal to sign message
        .then(handleSignMessage)
        // Send signature to backend on the /auth route
        .then(handleAuthenticate)
};