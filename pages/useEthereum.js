import { useState } from "react";
import { ethers } from "ethers";

const useEthereum = () => {
    const [address, setAddress] = useState();
    const [balance, setBalance] = useState(0);
    const [signer, setSigner] = useState();
    const [connected, setConnected] = useState();

    const connect = async () => {

        if (window.ethereum) {
            const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
            try {
                // Request account access if needed
                await ethereum.enable();

                await provider.send("eth_requestAccounts", []);
                const signer = provider.getSigner();

                const address = await signer.getAddress();
                setAddress(address);

                const balance = await signer.getBalance();
                setBalance(balance);

                if (signer === undefined) setConnected(false);
                else setConnected(true);

            } catch (error) {
                console.log(error);
            }

        } else if (window.web3) {
            await provider.send("eth_requestAccounts", []);
            const signer = provider.getSigner();

            const address = await signer.getAddress();
            setAddress(address);

            const balance = await signer.getBalance();
            setBalance(balance);

            if (signer === undefined) setConnected(false);
            else setConnected(true);
        }
    }


    const checkConnection = async () => {
        if (window.ethereum) {
            // Request account access if needed
            await ethereum.enable();
            const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
            await provider.send('eth_requestAccounts', []);
            const signer = await provider.getSigner();
            if (signer === undefined) setConnected(false);
            else {
                const address = await signer.getAddress();
                setAddress(address);
                setSigner(signer);
                setConnected(true);
            }
        } else if (window.web3) {
            const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
            await provider.send('eth_requestAccounts', []);
            const signer = await provider.getSigner();
            if (signer === undefined) setConnected(false);
            else {
                const address = await signer.getAddress();
                setAddress(address);
                setSigner(signer);
                setConnected(true);
            }
        }
    }

    return {
        balance,
        connect,
        address,
        connected,
        checkConnection,
    };
};

export default useEthereum;