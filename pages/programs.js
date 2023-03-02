import { ethers } from "ethers";
import { useEffect, useState } from "react";
import axios from "axios";
import ProgramBanner from "./components/ProgramBanner";
import { TESTNET, NFTAddress, NFTMarketplaceAddress } from "../config";
import NFTMarketplace from "../abi/NFTMarketplace.json";
import NFT from "../abi/NFT.json";
import { useRouter } from "next/router";

const programs = () => {

    const router = useRouter();
    const [programList, setProgramList] = useState([]);
    const [loadingState, setLoadingState] = useState('not-loaded');

    useEffect(() => {
        //load programs when web page loads
        loadPrograms();
    }, []);

    /**
     * Load the current user Nft
     * @returns {Promise<void>}
     */
    async function loadPrograms() {

        /* create a generic provider and query for listed programs items */
        const provider = new ethers.providers.JsonRpcProvider(TESTNET)
        const marketplaceContract = new ethers.Contract(NFTMarketplaceAddress, NFTMarketplace, provider)
        const tokenContract = new ethers.Contract(NFTAddress, NFT, provider);
        const data = await marketplaceContract.fetchPrograms()

        const items = await Promise.all(data.map(async i => {
            //getting the ipfs url of each program pic item
            const tokenURI = await tokenContract.tokenURI(i.tokenId);
            //fetching the ipfs url, which will return a meta json
            const meta = await axios.get(tokenURI);

            let item = {
                tokenId: i.tokenId.toNumber(),
                address: i.uid,
                pid: i.pid.toNumber(),
                image: meta.data.image,
                category: meta.data.category,
                title: meta.data.title,
                summary: meta.data.summary,
                year: meta.data.year
            };

            console.log(item);
            return item;
        }));

        setProgramList(items);
        setLoadingState('loaded');
    }


    //if (loadingState === 'loaded' && !programs.length) return (<h1 className="py-10 px-20 text-3xl"> No Programs have been published</h1>)

    return (
        <div className="bg-gray-200">
            <ProgramBanner />
            <div className="max-w-2xl mx-auto py-16 px-4 sm:py-4 sm:px-6 lg:max-w-7xl lg:px-8">
                <div className="mt-1 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">

                    {programList.map((program, i) => (
                        <div key={i} className="cursor-pointer rounded-xl bg-white p-3 shadow-lg hover:shadow-xl">
                            <div className="relative flex items-end overflow-hidden rounded-xl">
                                <img src={program?.image} className="aspect-square w-full object-cover" alt=" " />
                            </div>

                            <div className="mt-1 p-2">
                                <h2 className="text-slate-700 line-clamp-1">{program?.title}</h2>
                                <p className="mt-1 text-sm text-slate-400 line-clamp-2">{program?.summary}</p>

                                <div className="mt-3 flex items-end justify-between">
                                    <p>
                                        <span className="text-sm text-orange-300">Year: {program?.year}</span>
                                    </p>
                                </div>
                                <button onClick={() =>  router.push(`/programProfile?pid=${program.pid}&image=${program.image}&title=${program.title}&summary=${program.summary}&year=${program.year}&uid=${program.address}&category=${program.category}`)}
                                    className="mt-4 py-2 px-10 w-full text-white font-semibold border border-indigo-700 rounded-xl md:rounded-full focus:ring focus:ring-indigo-300 bg-indigo-600 hover:bg-indigo-700 transition ease-in-out duration-200" type="button">Program Profile</button>
                            </div>
                        </div>
                    ))}

                </div>
            </div>
        </div>
    )
};

export default programs;