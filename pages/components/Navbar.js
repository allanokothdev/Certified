import { useState, useEffect, useRef } from 'react'
import useEthereum from '../useEthereum';
import Link from 'next/link';

const NavBar = () => {

    const { connect, address, connected, checkConnection } = useEthereum();

    useEffect (() => {
        checkConnection();
    });

    const Button = ({ children, onClick }) => {
        return (
            
            <button onClick={onClick} className="inline-flex items-center w-full px-6 py-3 text-sm font-bold leading-4 text-white bg-indigo-600 md:px-3 md:w-auto md:rounded-full lg:px-5 hover:bg-indigo-500 focus:outline-none md:focus:ring-2 focus:ring-0 focus:ring-offset-2 focus:ring-indigo-600" type="button">{children}</button>
        )
    }

    return (
        <section className="overflow-hidden sticky top-0">
            <div className="flex items-center justify-between py-5 bg-white px-10">
                <div className="w-auto">
                    <div className="flex flex-wrap items-center">
                        <div className="w-auto mr-14">
                            <a href="/" className="inline-block py-4 md:py-0">
                                <span className="p-1 text-xl font-black leading-none text-gray-900">Certified.</span>
                            </a>
                        </div>
                    </div>
                </div>

                <div className="w-auto">
                    <div className="flex flex-wrap items-center">
                        <div className="w-auto hidden lg:block">
                            <ul className="flex items-center mr-16">
                                <li className="mr-9 font-medium hover:text-indigo-600">
                                    <Link href='/'>Home</Link>
                                </li>
                                <li className="mr-9 font-medium hover:text-indigo-600">
                                    <Link href='/programs'>Programs</Link>
                                </li>
                                <li className="mr-9 font-medium hover:text-indigo-600">
                                    <Link href='/professionals'>Professionals</Link>
                                </li>
                                <li className="font-medium hover:text-indigo-600">
                                    <Link href='/contact'>Contacts</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="w-auto">
                    <div className="flex flex-wrap items-center">
                        <div className="w-auto hidden lg:block">
                            <div className="inline-block">
                                {connected ? (
                                    <Button >{address.toString().substring(0, 11)+"..."}</Button>
                                ) : (
                                    <Button onClick={connect}>Connect Wallet</Button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </section>
    );
};

export default NavBar;


