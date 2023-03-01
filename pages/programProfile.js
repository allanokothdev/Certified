import { ethers } from "ethers";
import { useEffect, useState } from "react";
import axios from "axios";
import { TESTNET, NFTAddress, NFTMarketplaceAddress } from "../config";
import NFT from "../abi/NFT.json";
import NFTMarketplace from "../abi/NFTMarketplace.json";
import { useRouter } from "next/router";

const ProgramProfile = () => {

    const router = useRouter();
    const [certificates, setCertificates] = useState([])
    const [loadingState, setLoadingState] = useState('not-loaded');

    useEffect(() => {
        const { program } = router.query;
        console.log(program);
    }, []);

    async function loadCertificates() {

        /* create a generic provider and query for this program's listed certificates  */
        const provider = new ethers.providers.JsonRpcProvider(TESTNET)
        const marketplaceContract = new ethers.Contract(NFTMarketplaceAddress, NFTMarketplace, provider)
        const tokenContract = new ethers.Contract(NFTAddress, NFT, provider);
        const data = await marketplaceContract.fetchProgramCertificates(program?.programId)

        const items = await Promise.all(data.map(async i => {
            const tokenURI = await tokenContract.tokenURI(i.tokenId)
            const meta = await axios.get(tokenURI)

            let item = {
                title: meta.data.title,
                image: meta.data.image,
                summary: meta.data.summary,
                pid: meta.data.pid,
                year: meta.data.year,
                tokenId: i.tokenId.toNumber(),
                uid: i.uid
            };
            return item;
        }))
        setCertificates(items)
        setLoadingState('loaded')
    }

    return (
        <div className="bg-white mx-20">
            <div className="flex flex-col">
                <div className="bg-white border border-white shadow-lg p-4">
                    <div className="flex-none sm:flex">
                        <div className=" relative h-64 w-64 sm:mb-0 mb-3">
                            <img
                                src={program?.pic}
                                alt="Program Image"
                                className="w-64 h-64 object-cover rounded-2xl"
                            />

                        </div>
                        
                        <div className="flex-auto sm:ml-5 justify-evenly">
                            <div className="flex items-center justify-between sm:mt-2">
                                <div className="flex items-center">
                                    <div className="flex flex-col pt-3">
                                        <div className="w-full flex-none text-lg text-gray-800 font-bold leading-none">
                                            {program?.title}
                                        </div>
                                        <div className="flex-auto text-gray-500 my-1 pt-2">
                                            <span className="mr-3">{program?.category}</span>
                                            <span className="mr-3 border-r border-gray-200  max-h-0" />
                                            <span>{program?.year}</span>
                                        </div>
                                        <p className="mt-1 w-96 text-sm text-slate-400 pt-2">{program?.summary}</p>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="flex pt-4  text-sm text-gray-500">
                                <button onClick={() =>
                                    router.push({
                                        pathname: '/createCertificate',
                                        query: { program },
                                    })}
                                className="flex-no-shrink text-sm font-medium bg-indigo-600 hover:bg-indigo-500 px-5 py-2 shadow-sm hover:shadow-lg tracking-wider text-white rounded-full transition ease-in duration-300">
                                    Upload New Certificate
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-gray-200 max-w-2xl mx-auto py-16 px-4 sm:py-4 sm:px-6 lg:max-w-7xl lg:px-8">
                <div className="mt-1 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">

                    {certificates.map((certificate) => (
                        <div className="cursor-pointer rounded-xl bg-white p-3 shadow-lg hover:shadow-xl">
                            <div className="relative flex items-end overflow-hidden rounded-xl">
                                <img src={certificate.image} className="w-full aspect-[1.29/1] object-contain" alt=" " />
                            </div>

                            <div className="mt-1 p-2">
                                <h2 className="text-slate-700">{certificate.title}</h2>
                                <p className="mt-1 text-sm text-slate-400">{certificate.program}</p>

                                <div className="mt-3 flex items-end justify-between">
                                    <p>
                                        <span className="text-sm text-orange-300">{certificate.year}</span>
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

export default ProgramProfile;

