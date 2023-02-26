import { ethers } from "ethers";
import { useEffect, useState } from "react";
import axios from "axios";
import { NFTMarketplaceAddress } from "../config";
import { useRouter } from 'next/router';
import NFTMarketplace from "../abi/NFTMarketplace.json";

const programs = () => {

    const router = useRouter();
    const [programList, setProgramList] = useState([]);
    const [loadingState, setLoadingState] = useState('not-loaded');

    useEffect(() => {
        //load professionals when web page loads
        loadPrograms();
    }, []);

    /**
     * Load the current user Nft
     * @returns {Promise<void>}
     */
    async function loadPrograms() {

        /* create a generic provider and query for listed programs items */
        const provider = new ethers.providers.JsonRpcProvider("https://rpc-mumbai.maticvigil.com")
        const contract = new ethers.Contract(NFTMarketplaceAddress, NFTMarketplace, provider)
        const data = await contract.fetchPrograms()

        const items = await Promise.all(data.map(async i => {
            //getting the ipfs url of each program pic item
            const tokenURI = await tokenContract.tokenURI(i.tokenId);
            //fetching the ipfs url, which will return a meta json
            const meta = await axios.get(tokenURI);

            let item = {
                tokenId: i.tokenId.toNumber(),
                id: i.programId,
                address: i.publisher,
                pic: meta.data.image,
                title: meta.data.title,
                summary: meta.data.summary,
                description: meta.data.description,
                year: meta.data.year,
                applicationLink: meta.data.applicationLink
            };
            return item;
        }));

        setProgramList(items);
        setLoadingState('loaded');
    }
    if (loadingState === 'loaded' && !programList.length) return (<h1 className="py-10 px-20 text-3xl"> No Programs have been published</h1>)

    return (
        <div className="bg-white">
            <button className="justify-self-end mx-10 mt-4 py-2 px-10 text-white font-semibold border border-black rounded-xl md:rounded-full focus:ring focus:ring-black bg-black hover:bg-indigo-700 transition ease-in-out duration-200" type="button">Create Program</button>

            <div className="max-w-2xl mx-auto py-16 px-4 sm:py-4 sm:px-6 lg:max-w-7xl lg:px-8">
                <div className="mt-1 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">

                    {programList.map((program) => (
                        <div class="cursor-pointer rounded-xl bg-white p-3 shadow-lg hover:shadow-xl">
                            <div class="relative flex items-end overflow-hidden rounded-xl">
                                <img src="https://blockbuild.africa/wp-content/uploads/2022/09/content_polygon.png" alt="wallpaper" />
                            </div>

                            <div class="mt-1 p-2">
                                <h2 class="text-slate-700">{program.title}</h2>
                                <p class="mt-1 text-sm text-slate-400">{program.summary}</p>

                                <div class="mt-3 flex items-end justify-between">
                                    <p>
                                        <span class="text-sm text-orange-300">Deadline: {program.deadline}</span>
                                    </p>
                                </div>
                                <button className="mt-4 py-2 px-10 w-full text-white font-semibold border border-indigo-700 rounded-xl md:rounded-full focus:ring focus:ring-indigo-300 bg-indigo-600 hover:bg-indigo-700 transition ease-in-out duration-200" type="button">Certificates</button>
                            </div>
                        </div>
                    ))}

                </div>
            </div>
        </div>
    )
};

export default programs;

