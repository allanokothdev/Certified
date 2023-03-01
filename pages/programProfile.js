import { ethers } from "ethers";
import { useEffect, useState } from "react";
import axios from "axios";
import { TESTNET, NFTAddress, NFTMarketplaceAddress } from "../config";
import NFT from "../abi/NFT.json";
import NFTMarketplace from "../abi/NFTMarketplace.json";
import { useRouter } from "next/router";

const products = [
    {
        id: 1,
        name: 'Allan Okoth',
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
        price: '2023',
        brand: 'Polygon Fellowship',
    },
    {
        id: 2,
        name: 'Allan Okoth',
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
        price: '2023',
        brand: 'Polygon Fellowship',
    },
    {
        id: 3,
        name: 'Allan Okoth',
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
        price: '2023',
        brand: 'Polygon Fellowship',
    },
    {
        id: 4,
        name: 'Allan Okoth',
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
        price: '2023',
        brand: 'Polygon Fellowship',
    },
    {
        id: 5,
        name: 'Allan Okoth',
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
        price: '2023',
        brand: 'Polygon Fellowship',
    },
    {
        id: 6,
        name: 'Allan Okoth',
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
        price: '2023',
        brand: 'Polygon Fellowship',
    },
    {
        id: 7,
        name: 'Allan Okoth',
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
        price: '2023',
        brand: 'Polygon Fellowship',
    },
    {
        id: 8,
        name: 'Allan Okoth',
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
        price: '2023',
        brand: 'Polygon Fellowship',
    },
    {
        id: 9,
        name: 'Allan Okoth',
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
        price: '2023',
        brand: 'Polygon Fellowship',
    },
    {
        id: 10,
        name: 'Allan Okoth',
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
        price: '2023',
        brand: 'Polygon Fellowship',
    },
    {
        id: 11,
        name: 'Allan Okoth',
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
        price: '2023',
        brand: 'Polygon Fellowship',
    },
    {
        id: 12,
        name: 'Allan Okoth',
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
        price: '2023',
        brand: 'Polygon Fellowship',
    },
]

const ProgramProfile = () => {

    const router = useRouter();
    const [certificates, setCertificates] = useState([])
    const [loadingState, setLoadingState] = useState('not-loaded');
    const program = router.query;
    console.log(program);

    useEffect(() => {
        //loadCertificates();
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
        <section className="bg-gray-200">
            <div className="container px-2 py-8 mx-auto">
                <div className="lg:flex lg:-mx-2">

                    <div className="space-y-3 lg:w-1/5 lg:px-2 lg:space-y-4">

                        <div className="bg-white block border border-white flex-none sm:flex rounded-2xl p-2">

                            <div className="relative">
                                <img
                                    src={program?.image}
                                    alt=" "
                                    className="w-42 h-42 object-cover rounded-2xl"
                                />

                                <div className="flex-auto sm:ml-5 justify-evenly">
                                    <div className="flex items-center justify-between sm:mt-2">
                                        <div className="flex items-center">
                                            <div className="flex flex-col pt-3">
                                                <div className="flex-none text-lg text-gray-800 font-bold leading-none">
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
                                                query: program,
                                            })}
                                            className="flex-no-shrink text-sm font-medium bg-indigo-600 hover:bg-indigo-500 px-5 py-2 shadow-sm hover:shadow-lg tracking-wider text-white rounded-full transition ease-in duration-300">
                                            Upload New Certificate
                                        </button>
                                    </div>
                                </div>

                            </div>


                        </div>


                    </div>
                    <div className="mt-6 lg:mt-0 lg:px-2 lg:w-4/5 ">

                        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
                            {products.map((product, id) => (
                                <div key={id} className="cursor-pointer rounded-xl bg-white p-3 shadow-lg hover:shadow-xl">
                                    <div className="relative flex items-end overflow-hidden rounded-xl">
                                        <img src={product.imageSrc} className="w-full aspect-[1.29/1] object-cover" alt=" " />
                                    </div>

                                    <div className="mt-1 p-2">
                                        <h2 className="text-slate-700">{product.name}</h2>
                                        <p className="mt-1 text-sm text-slate-400">{product.brand}</p>

                                        <div className="mt-1 flex items-end justify-between">
                                            <p>
                                                <span className="text-sm text-orange-300">{product.price}</span>
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
    )
};

export default ProgramProfile;

