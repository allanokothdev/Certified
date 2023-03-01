/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { useState, useContext } from "react";
import { ethers } from "ethers";
import { create as ipfsHttpClient } from 'ipfs-http-client'
import Web3Modal from "web3modal";
import { Buffer } from 'buffer'
import { useRouter } from 'next/router'
import { NFTAddress, NFTMarketplaceAddress, projectId, projectSecret } from "../config";
import NFT from "../abi/NFT.json";
import NFTMarketplace from "../abi/NFTMarketplace.json";
const auth = 'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');


const client = ipfsHttpClient({
    host: 'ipfs.infura.io',
    port: 5001,
    protocol: 'https',
    headers: {
        authorization: auth,
    },
});

export default function createProgram() {

    const [fileUrl, setFileUrl] = useState(null);
    const [formInput, updateFormInput] = useState({ title: '', summary: '', category: '', year: '' })
    const router = useRouter();
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
            const url = `https://certified.infura-ipfs.io/ipfs/${added.path}`;

            setFileUrl(url);
            console.log("fileURL Updated")
        } catch (error) {
            console.log(error);
        }
    }

    /**
     * Publish Program Details on IPFS.
     */7
    async function publishOnIPFS() {
        const { title, summary, year, category } = formInput

        console.log(title);
        console.log(summary);
        console.log(year);
        console.log(category);

        console.log("Step Two")
        if ( !title || !summary || !year || !category || !fileUrl) return

        /* first, upload to IPFS */
        const data = JSON.stringify({
            title, summary, category, year, image: fileUrl
        })

        try {
            //uploading the certificate to ipfs
            const added = await client.add(data);
            //creating url to fetch the uploaded certificate
            const url = `https://certified.infura-ipfs.io/ipfs/${added.path}`;
            console.log(url)
            console.log(added.path)
            //listing the certificate or marking it as sale
            publishProgram(url, title, category, year);
        } catch (error) {
            console.log("Error in Uploading File:", error);
        }
    }

    /**
     * Creating the NFT. Calling the web 3.0 contracts here.
     * @param {string} url ipfs url where certificate is uploaded
     */
    async function publishProgram(url, title, category, year) {
         console.log("Step Five")
        const web3Modal = new Web3Modal();
        const connection = await web3Modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner();

        //NFT Contract
        let contract = new ethers.Contract(NFTAddress, NFT, signer);
        //minting the profile pic
        let transaction = await contract.createToken(url);
        //waiting for the minting transaction to finish
        let tx = await transaction.wait();

        let event = tx.events[0];
        let value = event.args[2];
        let tokenId = value.toNumber(); //Token Id Of the NFT


        //NFT Marketplace Contract
        contract = new ethers.Contract(NFTMarketplaceAddress, NFTMarketplace, signer);

        //listing the program. 
        transaction = await contract.createProgram(
            NFTAddress,
            tokenId,
            title,
            category,
            year
        );
        //waiting for the transaction to complete
        await transaction.wait();
        console.log("completed")
        //navigate back to home page
        router.back();
    }

    return (
        <div className="relative min-h-screen flex items-center justify-center bg-center bg-gray-200 py-12 px-4 sm:px-6 lg:px-8 bg-no-repeat bg-cover">
            
            <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-xl shadow-lg z-10">
                <div className="grid  gap-8 grid-cols-1">
                    <div className="flex flex-col">
                        
                        <div className="flex flex-col sm:flex-row items-center">
                            <h2 className="font-semibold text-lg mr-auto">Create Program</h2>
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
                                                Upload Program Photo
                                            </span>
                                            <input type="file" className="hidden" accept="image/*" onChange={onChange}/>
                                        </label>
                                    </div>
                                </div>

                                <div className="mb-3 space-y-2 w-full text-xs">
                                    <label className="font-semibold text-gray-600 py-2"> Program Title <abbr title="required">*</abbr>
                                    </label>
                                    <input
                                        placeholder="Enter Program Title"
                                        className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4"
                                        required="required"
                                        type="text"
                                        name="program_title"
                                        id="program_title"
                                        onChange={e => updateFormInput({ ...formInput, title: e.target.value })}
                                    />
                           <p className="text-red text-xs hidden">
                                        Please fill out this field.
                                    </p>
                                </div>

                                <div className="w-full flex flex-col mb-3 text-xs">
                                    <label className="font-semibold text-gray-600 py-2">  Select Category <abbr title="required">*</abbr></label>
                                    <select className="block w-full bg-white text-grey-darker border border-grey-lighter rounded-lg h-10 px-4 md:w-full " required="required" name="category" id="category" onChange={e => updateFormInput({ ...formInput, category: e.target.value })}>
                                        <option value="bootcamp">Bootcamp</option>
                                        <option value="competition">Competition</option>
                                        <option value="conference">Conference</option>
                                        <option value="course">Course</option>
                                        <option value="exchange">Exchange Program</option>
                                        <option value="fellowship">Fellowship</option>
                                        <option value="graduate">Grad School</option>
                                        <option value="hackathon">Hackathon</option>
                                        <option value="high">High School</option>
                                        <option value="internship">Internship</option>
                                        <option value="masters">Masters</option>
                                        <option value="undergraduate">Undergraduate</option>
                                        <option value="primary">Primary School</option>
                                    </select>
                                    <p className="text-sm text-red-500 hidden mt-3" id="error">Please fill out this field.</p>
                                </div>

                                <div className="w-full flex flex-col mb-3 text-xs">
                                    <label className="font-semibold text-gray-600 py-2">  Select Year <abbr title="required">*</abbr></label>
                                    <select className="block w-full bg-white text-grey-darker border border-grey-lighter rounded-lg h-10 px-4 md:w-full " required="required" name="year" id="year" onChange={e => updateFormInput({ ...formInput, year: e.target.value })}>
                                        <option value="2025">2025</option>
                                        <option value="2024">2024</option>
                                        <option value="2023">2023</option>
                                        <option value="2022">2022</option>
                                        <option value="2021">2021</option>
                                        <option value="2020">2020</option>
                                        <option value="2019">2019</option>
                                        <option value="2018">2018</option>
                                        <option value="2017">2017</option>
                                        <option value="2016">2016</option>
                                        <option value="2015">2015</option>
                                        <option value="2014">2014</option>
                                        <option value="2013">2013</option>
                                        <option value="2012">2012</option>
                                        <option value="2011">2011</option>
                                        <option value="2010">2010</option>
                                    </select>
                                    <p className="text-sm text-red-500 hidden mt-3" id="error">Please fill out this field.</p>
                                </div>

                                <div className="flex-auto w-full mb-1 text-xs space-y-2">
                                    <label className="font-semibold text-gray-600 py-2">
                                        Program Summary <abbr title="required">*</abbr>
                                    </label>

                                    <textarea
                                        required="required"
                                        name="summary"
                                        id="summary"
                                        className="min-h-[100px] max-h-[300px] h-28 appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg  py-4 px-4"
                                        placeholder="Enter Program Summary"
                                        spellCheck="false"
                                        defaultValue={""}
                                        onChange={e => updateFormInput({ ...formInput, summary: e.target.value })}
                                    />
                                    <p className="text-xs text-gray-400 text-left my-3">
                                        You inserted 0 characters
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