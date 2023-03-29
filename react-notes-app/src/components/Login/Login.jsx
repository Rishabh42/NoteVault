import React, { useState } from 'react';
import Web3 from 'web3';

let web3 = undefined; // Will hold the web3 instance

const Login = () => {
    const [loading, setLoading] = useState(false); // Loading button state

    const handleAuthenticate = ({
        publicAddress,
        signature,
    }) =>
        fetch(`${process.env.REACT_APP_BACKEND_URL}/auth`, {
            body: JSON.stringify({ publicAddress, signature }),
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
            credentials: 'include'
        }).then((response) => response.json());

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

    const handleSignup = (publicAddress) =>
        fetch(`${process.env.REACT_APP_BACKEND_URL}/users`, {
            body: JSON.stringify({ publicAddress }),
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
        }).then((response) => response.json());

    const handleClick = async () => {
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
        setLoading(true);

        // Look if user with current publicAddress is already present on backend
        fetch(
            `${process.env.REACT_APP_BACKEND_URL}/users?publicAddress=${publicAddress}`
        )
            .then((response) => response.json())
            // If yes, retrieve it. If no, create it.
            .then((response) =>
                response.users.length ? response.users[0] : handleSignup(publicAddress)

            )
            // Popup MetaMask confirmation modal to sign message
            .then(handleSignMessage)
            // Send signature to backend on the /auth route
            .then(handleAuthenticate)
            // Pass accessToken back to parent component (to save it in localStorage)
            .then(() => window.alert("Login successful"))
            .catch((err) => {
                window.alert(err);
                setLoading(false);
            });
    };

    return (
        <div>
            <p>
                Please select your login method.
                <br />
            </p>
            <button onClick={handleClick}>
                {loading ? 'Loading...' : 'Login with MetaMask'}
            </button>
        </div>
    );
};

export default Login;