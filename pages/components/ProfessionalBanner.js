import { useState, useEffect, useRef } from 'react'
import useEthereum from '../useEthereum';
import Link from 'next/link';

const ProfessionalBanner = () => {

    const OpenProfessional = () => {
        return (
            <Link className="mb-8 py-2 px-10 text-white font-semibold border text-center border-indigo-700 rounded-xl md:rounded-full focus:ring focus:ring-indigo-300 bg-indigo-600 hover:bg-indigo-700 transition ease-in-out duration-200" href="/createProfessional">Create Professional Account</Link>
        )
    }

    return (
        <div className="w-full dark:bg-gray-500"
            style={{
                backgroundImage: "url('https://source.unsplash.com/random/640x480')",
                backgroundPosition: 'center',
                backgroundSize: 'cover'
            }}
        >

            <div className="container flex flex-col flex-wrap content-center justify-center p-4 py-20 mx-auto md:p-10">
                <h1 className="text-5xl antialiased font-semibold leading-none text-center text-gray-100">Get Our Updates</h1>
                <p className="pt-2 pb-8 text-xl antialiased text-center text-gray-100">Find out about events and other news</p>
                <OpenProfessional />
            </div>
        </div>

    );
};

export default ProfessionalBanner;


