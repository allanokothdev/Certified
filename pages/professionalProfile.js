import { ethers } from "ethers";
import { useEffect, useState } from "react";
import axios from "axios";
import { TESTNET, NFTAddress, NFTMarketplaceAddress } from "../config";
import NFT from "../abi/NFT.json";
import NFTMarketplace from "../abi/NFTMarketplace.json";
import { useRouter } from "next/router";


const professionalProfile = () => {

    const router = useRouter();
    const [certificates, setCertificates] = useState([])
    const [loadingState, setLoadingState] = useState('not-loaded');
    const { uid, name, title, image, location, summary } = router.query;
    loadCertificates();

    async function loadCertificates() {

        /* create a generic provider and query for this program's listed certificates  */
        const provider = new ethers.providers.JsonRpcProvider(TESTNET)
        const marketplaceContract = new ethers.Contract(NFTMarketplaceAddress, NFTMarketplace, provider)
        const tokenContract = new ethers.Contract(NFTAddress, NFT, provider);
        const data = await marketplaceContract.fetchProfessionalCertificates(uid)

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
        <>
            <Head>
                <title>Professional Profile</title>
                <meta name="description" content="Professional" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="../public/favicon.png" />
            </Head>
            <section className="bg-gray-200">
                <div className="px-4 py-8 mx-auto">
                    <div className="lg:flex lg:-mx-2">

                        <div className="space-y-3 lg:w-1/5 lg:px-2 lg:space-y-4">

                            <div className="bg-white border border-white rounded-2xl p-2">

                                <div className="relative">
                                    <img
                                        src={image}
                                        alt=" "
                                        className="w-full aspect-square object-cover rounded-2xl"
                                    />

                                    <div className="flex-auto sm:ml-5 justify-evenly">
                                        <div className="flex items-center justify-between sm:mt-2">
                                            <div className="flex items-center">
                                                <div className="flex flex-col pt-2">
                                                    <div className="flex-none text-lg text-gray-800 font-bold leading-none">
                                                        {name}
                                                    </div>
                                                    <span className="pt-2">{title}</span>
                                                    <span className="pt-2">{location}</span>
                                                    <p className="w-96 text-sm text-slate-400 pt-2">{summary}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>


                            </div>


                        </div>
                        <div className="mt-6 lg:mt-0 lg:px-2 lg:w-4/5 ">

                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-3">
                                {certificates.map((certificate, i) => (
                                    <div key={i} className="cursor-pointer rounded-xl bg-white p-3 shadow-lg hover:shadow-xl">
                                        <div className="relative flex items-end overflow-hidden rounded-xl">
                                            <img src={certificate.image} className="w-full aspect-[1.29/1] object-cover" alt=" " />
                                        </div>

                                        <div className="mt-1 p-2">
                                            <h2 className="text-slate-700">{certificate.name}</h2>
                                            <p className="mt-1 text-sm text-slate-400">{certificate.summary}</p>

                                            <div className="mt-1 flex items-end justify-between">
                                                <p>
                                                    <span className="text-sm text-orange-300">{certificate.year}</span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
};

export default professionalProfile;

