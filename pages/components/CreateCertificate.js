/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { useState, useContext } from "react";
import { ethers } from "ethers";
import { create as ipfsHttpClient } from 'ipfs-http-client'
import { useRouter } from "next/router";
import Web3Modal from "web3modal";
import { Buffer } from 'buffer'
import { NFTAddress, NFTMarketplaceAddress, projectId, projectSecret } from "../../config";
import NFT from "../../abi/NFT.json";
import NFTMarketplace from "../../abi/NFTMarketplace.json";

const auth = 'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');


const client = ipfsHttpClient({
    host: 'infura-ipfs.io',
    port: 5001,
    protocol: 'https',
    headers: {
        authorization: auth,
    },
});

const CreateCertificate = ({ program }) => {

    const [fileUrl, setFileUrl] = useState(null);
    const [formInput, updateFormInput] = useState({ title: '', description: program?.title, student: '', year: program?.year, pid: program?.pid })

    /**
     * On nft file change
     * @param {event} e event
     */
    async function onChange(e) {
        //selecting the first file, which is uploaded
        const file = e.target.files[0];
        try {
            //uploading it to ipfs
            const added = await client.add(
                file,
                {
                    progress: (prog) => console.log(`received: ${prog}`)
                }
            );
            //creating the url to fetch the uploaded file
            const url = `https://infura-ipfs.io/ipfs/${added.path}`;

            setFileUrl(url);
        } catch (error) {
            console.log(error);
        }
    }

    /**
     * Create a new certificate.
     */
    async function publishOnIPFS() {
        const { title, description, year, pid, student } = formInput
        if (!title || !student || !fileUrl) return
        /* first, upload to IPFS */
        const data = JSON.stringify({
            title, description, pid, year, image: fileUrl
        })

        try {
            //uploading the certificate to ipfs
            const added = await client.add(data);
            //creating url to fetch the uploaded certificate
            const url = `https://infura-ipfs.io/ipfs/${added.path}`;
            console.log(url)
            console.log(added.path)
            //listing the certificate or marking it as sale
            publishCertificate(url, student, pid);
        } catch (error) {
            console.log("Error in Uploading File:", error);
        }
    }

    /**
     * Creating the NFT and Making it to sale. Calling the web 3.0 contracts here.
     * @param {string} url ipfs url where certificate is uploaded
     */
    async function publishCertificate(url, student, pid) {
        const web3Modal = new Web3Modal();
        const connection = await web3Modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner();

        //NFT Contract
        let contract = new ethers.Contract(NFTAddress, NFT, signer);
        //minting the certificate
        let transaction = await contract.createToken(url);
        //waiting for the minting transaction to finish
        let tx = await transaction.wait();

        let event = tx.events[0];
        let value = event.args[2];
        let tokenId = value.toNumber(); //Token Id Of the NFT


        //NFT Marketplace Contract
        contract = new ethers.Contract(NFTMarketplaceAddress, NFTMarketplace, signer);

        //listing the certificate. 
        transaction = await contract.createCertificate(
            NFTAddress,
            student,
            pid,
            tokenId
        );
        //waiting for the transaction to complete
        await transaction.wait();
        console.log("completed")
        //navigate back to home page
        router.push('/');
    }

    return (
        <div className="bg-white">
            <div className="flex justify-center">
                <div className="w-1/2 flex flex-col pb-12">

                    <input
                        placeholder="Certificate Name"
                        className="mt-8 border rounded p-4"
                        onChange={e => updateFormInput({ ...formInput, title: e.target.value })}
                    />

                    <input
                        placeholder="Student Wallet Address"
                        className="mt-8 border rounded p-4"
                        onChange={e => updateFormInput({ ...formInput, student: e.target.value })}
                    />

                    <textarea
                        placeholder="Certificate Description"
                        className="mt-2 border rounded p-4"
                        onChange={e => updateFormInput({ ...formInput, description: e.target.value })}
                    />

                    <input
                        type="file"
                        name="Asset"
                        className="my-4"
                        onChange={onChange}
                    />

                    {
                        fileUrl && (<img className="rounded mt-4" width="350" src={fileUrl} />)
                    }

                    <button onClick={publishOnIPFS} className="font-bold mt-4 bg-pink-500 text-white rounded p-4 shadow-lg">
                        Publish Certificate
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreateCertificate;
