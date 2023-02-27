import { useState } from "react";
import { ethers } from "ethers";
import { create as ipfsHttpClient } from 'ipfs-http-client'
import { useRouter } from "next/router";
import Web3Modal from "web3modal";
import { Buffer } from 'buffer';
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

const CreateProfessional = () => {

    const [fileUrl, setFileUrl] = useState(null);
    const [formInput, updateFormInput] = useState({ name: '', title: '', summary: '', twitterLink: '', githubLink: '', linkedinLink: '' });
    const router = useRouter();

    const handleOnClose = () => {
        if (e.target.id === "container") onClose();
    };


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
     * Create a new professional profile.
     */
    async function createProf() {
        //getting name, description from the formInput dictionary
        const { name, title, summary, twitterLink, githubLink, linkedinLink } = formInput;

        //If any of them is not present then it will not create the Professional Item
        if (!name || !title || !summary || !fileUrl || !twitterLink || !githubLink || !linkedinLink) return;

        const data = JSON.stringify({
            name, title, summary, twitterLink, githubLink, linkedinLink, image: fileUrl,
        });

        try {
            //uploading the profile pic to ipfs
            const added = await client.add(data);
            //creating url to fetch the uploaded profile pic
            const url = `https://infura-ipfs.io/ipfs/${added.path}`;
            console.log(url)
            console.log(added.path)
            //listing the professional account
            publishProfile(url, name, title);
        } catch (error) {
            console.log("Error in Uploading File:", error);
        }
    }

    /**
     * Creating the NFT Professional Profile. Calling the web 3.0 contracts here.
     * @param {string} url ipfs url where professional profile pic is uploaded
     */
    async function publishProfile(url, name, title) {
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

        //listing the account. 
        transaction = await contract.createProfessional(
            NFTAddress,
            tokenId,
            name,
            title
        );
        //waiting for the transaction to complete
        await transaction.wait();
        console.log("completed")
        //navigate back to home page
        router.push('/');
    }

    if (!visible) return null;

    return (
        <div id='container' className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm min-h-screen flex items-center justify-center">
            <div className="max-w-md p-10 w-full space-y-8 bg-white rounded-xl shadow-lg z-10">
                <div className="grid  gap-8 grid-cols-1">
                    <div className="flex flex-col ">

                        <div className="flex flex-col sm:flex-row items-center">
                            <h2 className="font-semibold text-lg mr-auto">Create Professional Account</h2>
                            <div className="w-full sm:w-auto sm:ml-auto mt-3 sm:mt-0" />
                        </div>
                        
                        <div className="mt-1">
                            <div className="form">
                                <div className="md:space-y-2 mb-2">

                                    <div className="flex items-center py-2">
                                        <div className="w-24 h-24 mr-4 flex-none rounded-xl border overflow-hidden">
                                            <img
                                                className="w-24 h-24 mr-4 object-cover"
                                                src={fileUrl}
                                                alt="Pic Upload"
                                            />
                                        </div>
                                        <label className="cursor-pointer ">
                                            <span className="focus:outline-none text-white text-sm py-2 px-4 rounded-full bg-green-400 hover:bg-green-500 hover:shadow-lg">
                                                Upload Photo
                                            </span>
                                            <input type="file" name="Asset" accept="image/*" className="hidden" />
                                        </label>
                                    </div>
                                </div>

                                <div className="md:flex flex-row md:space-x-4 w-full text-xs">
                                    <div className="mb-3 space-y-2 w-full text-xs">
                                        <label className="font-semibold text-gray-600 py-2">
                                            Your Name <abbr title="required">*</abbr>
                                        </label>
                                        <input
                                            placeholder="Your Name"
                                            className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4"
                                            required="required"
                                            type="text"
                                            name="professional_name"
                                            id="professional_name"
                                            onChange={e => updateFormInput({ ...formInput, name: e.target.value })}
                                        />
                                        <p className="text-red text-xs hidden">Please fill out this field.</p>
                                    </div>
                                    <div className="mb-3 space-y-2 w-full text-xs">
                                        <label className="font-semibold text-gray-600 py-2">
                                            Your Job Title <abbr title="required">*</abbr>
                                        </label>
                                        <input
                                            placeholder="Your Job Title"
                                            className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4"
                                            required="required"
                                            type="text"
                                            name="professional_title"
                                            id="professional_title"
                                            onChange={e => updateFormInput({ ...formInput, title: e.target.value })}
                                        />
                                        <p className="text-red text-xs hidden">
                                            Please fill out this field.
                                        </p>
                                    </div>
                                </div>

                                <div className="mb-3 space-y-2 w-full text-xs">
                                    <label className=" font-semibold text-gray-600 py-2">
                                        LinkedIn Link <abbr title="required">*</abbr>
                                    </label>
                                    <div className="flex flex-wrap items-stretch w-full mb-4 relative">
                                        <div className="flex">
                                            <span className="flex leading-normal bg-grey-lighter border-1 rounded-r-none border border-r-0 border-blue-300 px-3 whitespace-no-wrap text-grey-dark text-sm w-12 h-10 bg-blue-300 justify-center items-center  text-xl rounded-lg text-white">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-6 w-6"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                                    />
                                                </svg>
                                            </span>
                                        </div>
                                        <input
                                            type="text"
                                            className="flex-shrink flex-grow flex-auto leading-normal w-px flex-1 border border-l-0 h-10 border-grey-light rounded-lg rounded-l-none px-3 relative focus:border-blue focus:shadow"
                                            placeholder="https://"
                                            name="professional_linkedin"
                                            id="professional_linkedin"
                                            onChange={e => updateFormInput({ ...formInput, linkedinLink: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="mb-3 space-y-2 w-full text-xs">
                                    <label className=" font-semibold text-gray-600 py-2">
                                        GitHub Link <abbr title="required">*</abbr>
                                    </label>
                                    <div className="flex flex-wrap items-stretch w-full mb-4 relative">
                                        <div className="flex">
                                            <span className="flex leading-normal bg-grey-lighter border-1 rounded-r-none border border-r-0 border-blue-300 px-3 whitespace-no-wrap text-grey-dark text-sm w-12 h-10 bg-blue-300 justify-center items-center  text-xl rounded-lg text-white">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-6 w-6"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                                    />
                                                </svg>
                                            </span>
                                        </div>
                                        <input
                                            type="text"
                                            className="flex-shrink flex-grow flex-auto leading-normal w-px flex-1 border border-l-0 h-10 border-grey-light rounded-lg rounded-l-none px-3 relative focus:border-blue focus:shadow"
                                            placeholder="https://"
                                            name="professional_github"
                                            id="professional_github"
                                            onChange={e => updateFormInput({ ...formInput, githubLink: e.target.value })}
                                        />
                                    </div>
                                </div>


                                <div className="flex-auto w-full mb-1 text-xs space-y-2">
                                    <label className="font-semibold text-gray-600 py-2">
                                        Professional Bio<abbr title="required">*</abbr>
                                    </label>
                                    <textarea
                                        required="required"
                                        name="professional_bio"
                                        id="professional_bio"
                                        className="min-h-[100px] max-h-[300px] h-16 appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg  py-4 px-4"
                                        placeholder="Enter your professional bio"
                                        spellCheck="false"
                                        defaultValue={""}
                                        onChange={e => updateFormInput({ ...formInput, summary: e.target.value })}
                                    />
                                </div>

                                <div className="mt-5 text-right md:space-x-3 md:block flex flex-col-reverse">
                                    <button onClick={onClose} className="mb-2 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-full hover:shadow-lg hover:bg-gray-100">
                                        {" "}
                                        Cancel{" "}
                                    </button>
                                    <button className="mb-2 md:mb-0 bg-indigo-600 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-green-500">
                                        Save
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateProfessional;






















