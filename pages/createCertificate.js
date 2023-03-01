/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { useState, useContext } from "react";
import { ethers } from "ethers";
import { create as ipfsHttpClient } from 'ipfs-http-client'
import { useRouter } from "next/router";
import Web3Modal from "web3modal";
import { Buffer } from 'buffer'
import { NFTAddress, NFTMarketplaceAddress, projectId, projectSecret } from "../config";
import NFT from "../abi/NFT.json";
import NFTMarketplace from "../abi/NFTMarketplace.json";
const auth = 'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');

const client = ipfsHttpClient({
    host: 'infura-ipfs.io',
    port: 5001,
    protocol: 'https',
    headers: {
        authorization: auth,
    },
});


export default function CreateCertificate() {

    const router = useRouter();
    const program = router.query;
    console.log(program);

    const [fileUrl, setFileUrl] = useState(null);
    const [formInput, updateFormInput] = useState({ title: '', summary: program?.title, student: '', year: program?.year, pid: program?.pid })

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
        const { title, summary, year, pid, student } = formInput
        if (!title || !student || !fileUrl) return
        /* first, upload to IPFS */
        const data = JSON.stringify({
            title, summary, pid, year, image: fileUrl
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
        router.back();
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center bg-center bg-gray-200 py-12 px-4 sm:px-6 lg:px-8 bg-no-repeat bg-cover">

            <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-xl shadow-lg z-10">
                <div className="grid  gap-8 grid-cols-1">
                    <div className="flex flex-col">

                        <div className="flex flex-col sm:flex-row items-center">
                            <h2 className="font-semibold text-lg mr-auto">Upload Certificate</h2>
                            <div className="w-full sm:w-auto sm:ml-auto mt-3 sm:mt-0" />
                        </div>
                        <div className="mt-5">
                            <div className="form">
                                <div className="md:space-y-2 mb-3">

                                    <div className="flex items-center py-2">
                                        <div className="w-36 h-36 mr-4 flex-none rounded-xl border overflow-hidden">
                                            <img
                                                className="w-36 h-36 mr-4 object-cover bg-gray-200"
                                                src={fileUrl}
                                                alt=" "
                                            />
                                        </div>
                                        <label className="cursor-pointer ">
                                            <span className="focus:outline-none text-white text-sm py-2 px-4 rounded-full bg-indigo-600 hover:bg-indigo-500 hover:shadow-lg">
                                                Upload Certificate
                                            </span>
                                            <input type="file" className="hidden" accept="image/*" onChange={onChange} />
                                        </label>
                                    </div>
                                </div>

                                <div className="mb-3 space-y-2 w-full text-xs">
                                    <label className="font-semibold text-gray-600 py-2"> Student Name <abbr title="required">*</abbr>
                                    </label>
                                    <input
                                        placeholder="Enter Student Name"
                                        className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4"
                                        required="required"
                                        type="text"
                                        name="title"
                                        id="title"
                                        onChange={e => updateFormInput({ ...formInput, title: e.target.value })}
                                    />
                                    <p className="text-red text-xs hidden">
                                        Please fill out this field.
                                    </p>
                                </div>


                                <div className="mb-3 space-y-2 w-full text-xs">
                                    <label className="font-semibold text-gray-600 py-2"> Student Wallet Address <abbr title="required">*</abbr>
                                    </label>
                                    <input
                                        placeholder="Enter Student Name"
                                        className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4"
                                        required="required"
                                        type="text"
                                        name="student"
                                        id="student"
                                        onChange={e => updateFormInput({ ...formInput, student: e.target.value })}
                                    />
                                    <p className="text-red text-xs hidden">
                                        Please fill out this field.
                                    </p>
                                </div>

                    
                                <div className="mt-5 text-right md:space-x-3 md:block flex flex-col-reverse">

                                    <button onClick={publishOnIPFS} className="mb-2 md:mb-0 bg-indigo-600 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-indigo-400">
                                        Publish
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}