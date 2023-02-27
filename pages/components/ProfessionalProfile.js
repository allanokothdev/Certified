import { ethers } from "ethers";
import { useEffect, useState } from "react";
import axios from "axios";
import Web3Modal from "web3modal";
import { nftAddress, nftMarketplaceAddress } from "../../config";

import NFT from "../../abi/NFT.json";
import NFTMarketplace from "../../abi/NFTMarketplace.json";

const ProfessionalProfile = ({ professional }) => {

    const [certificates, setCertificates] = useState([])
    const [loadingState, setLoadingState] = useState('not-loaded')
    const router = useRouter()
    useEffect(() => {
        loadCertificates()
    }, [])
    async function loadCertificates() {

        /* create a generic provider and query for this professional's listed certificates  */
        const provider = new ethers.providers.JsonRpcProvider()
        const contract = new ethers.Contract(nftMarketplaceAddress, NFTMarketplace.abi, provider)
        const data = await contract.fetchProfessionalCertificates(professional?.userId)

        const items = await Promise.all(data.map(async i => {
            const tokenURI = await marketplaceContract.tokenURI(i.tokenId)
            const meta = await axios.get(tokenURI)

            let item = {
                title: meta.data.title,
                summary: meta.data.summary,
                image: meta.data.image,
                year: meta.data.year,
                tokenId: i.tokenId.toNumber(),
                student: i.uid,
                programId: i.pid
            };
            return item;
        }))
        setCertificates(items)
        setLoadingState('loaded')
    }

    if (loadingState === 'loaded' && !certificates.length) return (<h1 className="py-10 px-20 text-3xl">No Certificates Uploaded</h1>)

    return (
        <div className="bg-white mx-20">
            <div className="flex flex-col">
                <div className="bg-white border border-white shadow-lg p-4">
                    <div className="flex-none sm:flex">
                        <div className=" relative h-64 w-64 sm:mb-0 mb-3">
                            <img
                                src={professional?.image}
                                alt="Professional Profile Image"
                                className="w-64 h-64 object-cover rounded-2xl"
                            />

                        </div>

                        <div className="flex-auto sm:ml-5 justify-evenly">
                            <div className="flex items-center justify-between sm:mt-2">
                                <div className="flex items-center">
                                    <div className="flex flex-col pt-3">
                                        <div className="w-full flex-none text-lg text-gray-800 font-bold leading-none">
                                            {professional?.name}
                                        </div>
                                        <div className="flex-auto text-gray-500 my-1 pt-2">
                                            <span className="mr-3">{professional?.title}</span>
                                            <span className="mr-3 border-r border-gray-200  max-h-0" />
                                            <span>{professional?.location}</span>
                                        </div>
                                        <p className="mt-1 w-96 text-sm text-slate-400 pt-2">{professional?.summary}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div className="max-w-2xl mx-auto py-16 px-4 sm:py-4 sm:px-6 lg:max-w-7xl lg:px-8">
                <div className="mt-1 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">

                    {certificates.map((certificate) => (
                        <div class="cursor-pointer rounded-xl bg-white p-3 shadow-lg hover:shadow-xl">
                            <div class="relative flex items-end overflow-hidden rounded-xl">
                                <img src={certificate.image} alt="wallpaper" />
                            </div>

                            <div class="mt-1 p-2">
                                <h2 class="text-slate-700">{certificate.title}</h2>
                                <p class="mt-1 text-sm text-slate-400">{certificate.description}</p>

                                <div class="mt-3 flex items-end justify-between">
                                    <p>
                                        <span class="text-sm text-orange-300">{certificate.year}</span>
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
}

export default ProfessionalProfile;

