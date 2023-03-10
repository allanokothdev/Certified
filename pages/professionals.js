import { ethers } from "ethers";
import { useEffect, useState } from "react";
import axios from "axios";
import { TESTNET, NFTAddress, NFTMarketplaceAddress } from "../config";
import NFTMarketplace from "../abi/NFTMarketplace.json";
import NFT from "../abi/NFT.json";
import ProfessionalBanner from "./components/ProfessionalBanner";
import { useRouter } from "next/router";
import Head from 'next/head'

const professionals = () => {

    const router = useRouter();
    const [professionalList, setProfessionalList] = useState([]);
    const [loadingState, setLoadingState] = useState('not-loaded');

    useEffect(() => {
        //load professionals when web page loads
        loadProfessionals();
    }, []);

    /**
     * Load the current user Nft
     * @returns {Promise<void>}
     */
    async function loadProfessionals() {
        /* create a generic provider and query for listed programs items */
        const provider = new ethers.providers.JsonRpcProvider(TESTNET)
        const marketplaceContract = new ethers.Contract(NFTMarketplaceAddress, NFTMarketplace, provider);
        const tokenContract = new ethers.Contract(NFTAddress, NFT, provider);
        const data = await marketplaceContract.fetchProfessionals()

        const items = await Promise.all(data.map(async i => {
            //getting the ipfs url of each certificate item
            const tokenURI = await tokenContract.tokenURI(i.tokenId);
            //fetching the ipfs url, which will return a meta json
            const meta = await axios.get(tokenURI);

            let item = {
                tokenId: i.tokenId.toNumber(),
                uid: i.uid,
                image: meta.data.image,
                name: meta.data.name,
                title: meta.data.title,
                summary: meta.data.summary,
                location: meta.data.location,
                twitterLink: meta.data.twitterLink,
                githubLink: meta.data.githubLink,
                linkedinLink: meta.data.linkedinLink
            };
            return item; 
        }));

        setProfessionalList(items);
        setLoadingState('loaded');
    }

    // if (loadingState === 'loaded' && !professionals.length) return (<h1 className="py-10 px-20 text-3xl"> No Professionals have registered</h1>)

    return (
        <>
            <Head>
                <title>Professionals</title>
                <meta name="description" content="Professionals" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="../public/favicon.png" />
            </Head>
            <div className="bg-gray-200">
                <ProfessionalBanner />
                <div className="max-w-2xl mx-auto py-16 px-4 sm:py-4 sm:px-6 lg:max-w-7xl lg:px-8">
                    <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">

                        {professionalList.map((professional, i) => (
                            <div onClick={() => router.push(`/professionalProfile?uid=${professional.uid}&image=${professional.image}&name=${professional.name}&title=${professional.title}&location=${professional.location}&summary=${professional.summary}`)}

                                key={i} className="w-full border bg-white border-gray-200 rounded-lg shadow-sm">
                                <div className="flex flex-col items-center justify-center p-10">
                                    <img alt=" " className="w-32 h-32 mb-6 rounded-full object-cover" src={professional?.image} />
                                    <h2 className="text-lg font-medium line-clamp-1">{professional?.name}</h2>
                                    <p className="font-medium text-blue-500 line-clamp-1">{professional?.title}</p>
                                </div>
                                <div className="flex border-t border-gray-200 divide-x divide-gray-200">
                                    <a href={professional?.twitterLink} className="flex-1 block p-5 text-center text-gray-300 transition duration-200 ease-out hover:bg-gray-100 hover:text-gray-500" target="_blank" rel="noreferrer">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-6 h-6 mx-auto fill-current"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                                        </svg>
                                    </a>
                                    <a href={professional?.githubLink} className="flex-1 block p-5 text-center text-gray-300 transition duration-200 ease-out hover:bg-gray-100 hover:text-gray-500" target="_blank" rel="noreferrer">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-auto fill-current" viewBox="0 0 24 24">
                                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                        </svg>
                                    </a>
                                    <a href={professional?.linkedinLink} className="flex-1 block p-5 text-center text-gray-300 transition duration-200 ease-out hover:bg-gray-100 hover:text-gray-500" target="_blank" rel="noreferrer">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-auto fill-current" viewBox="0 0 24 24">
                                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        ))}

                    </div>
                </div>
            </div>
        </>
    ) 
};

export default professionals;
