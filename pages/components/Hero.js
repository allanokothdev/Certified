import React from 'react';
import Link from 'next/link';

const Hero = () => {

    const OpenPage = () => {
        return (
            <Link className="mb-12 py-2 px-10 text-white font-semibold border border-indigo-700 rounded-xl md:rounded-full focus:ring focus:ring-indigo-300 bg-indigo-600 hover:bg-indigo-700 transition ease-in-out duration-200" href="/createProgram">Get Started today!</Link>
        )
    }

    return (
        <section className="bg-blueGray-50">

            <div className="overflow-x-hidden p-16 flex justify-center items-center">
                <div className="container px-4 mx-auto">
                    <div className="flex flex-wrap items-center -m-8">
                        <div className="w-full md:w-1/2 lg:w-4/12 xl:w-4/12">


                            <h1 className="mb-12 text-6xl md:text-6xl lg:text-4xl xl:text-6xl font-bold font-heading md:max-w-2xl leading-none">
                                Protect your Brand's reputation
                            </h1>

                            <div>
                                <p className="mb-10 text-lg text-gray-700 font-medium md:max-w-sm">
                                    Ensure the integrity of your educational institution's certificates with Certified
                                </p>

                                <div className="mb-2 md:inline-block">

                                    <OpenPage />
                                    <h3 className="mt-12 text-gray-900 font-semibold">Trusted by top brands – Certified</h3>

                                </div>

                                <div className="flex flex-wrap items-center -m-1">
                                    <div className="w-auto p-1">
                                        <div className="flex flex-wrap -m-0.5">
                                            <div className="w-auto p-0.5">
                                                <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M7.707 1.21267C8.02812 0.224357 9.42632 0.224357 9.74744 1.21267L10.8948 4.74387C11.0384 5.18586 11.4503 5.48511 11.915 5.48511H15.6279C16.6671 5.48511 17.0992 6.81488 16.2585 7.42569L13.2547 9.60809C12.8787 9.88126 12.7214 10.3654 12.865 10.8074L14.0123 14.3386C14.3335 15.327 13.2023 16.1488 12.3616 15.538L9.35775 13.3556C8.98178 13.0824 8.47266 13.0824 8.09669 13.3556L5.09287 15.538C4.25216 16.1488 3.12099 15.327 3.44211 14.3386L4.58947 10.8074C4.73308 10.3654 4.57575 9.88126 4.19978 9.60809L1.19596 7.42569C0.355248 6.81488 0.787317 5.48511 1.82649 5.48511H5.53942C6.00415 5.48511 6.41603 5.18586 6.55964 4.74387L7.707 1.21267Z" fill="#6366F1" data-path="0.2.0.0.0.1.3.0.0.0.0.0" />
                                                </svg>
                                            </div>
                                            <div className="w-auto p-0.5">
                                                <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M7.707 1.21267C8.02812 0.224357 9.42632 0.224357 9.74744 1.21267L10.8948 4.74387C11.0384 5.18586 11.4503 5.48511 11.915 5.48511H15.6279C16.6671 5.48511 17.0992 6.81488 16.2585 7.42569L13.2547 9.60809C12.8787 9.88126 12.7214 10.3654 12.865 10.8074L14.0123 14.3386C14.3335 15.327 13.2023 16.1488 12.3616 15.538L9.35775 13.3556C8.98178 13.0824 8.47266 13.0824 8.09669 13.3556L5.09287 15.538C4.25216 16.1488 3.12099 15.327 3.44211 14.3386L4.58947 10.8074C4.73308 10.3654 4.57575 9.88126 4.19978 9.60809L1.19596 7.42569C0.355248 6.81488 0.787317 5.48511 1.82649 5.48511H5.53942C6.00415 5.48511 6.41603 5.18586 6.55964 4.74387L7.707 1.21267Z" fill="#6366F1" data-path="0.2.0.0.0.1.3.0.0.0.0.0" />
                                                </svg>
                                            </div>
                                            <div className="w-auto p-0.5">
                                                <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M7.707 1.21267C8.02812 0.224357 9.42632 0.224357 9.74744 1.21267L10.8948 4.74387C11.0384 5.18586 11.4503 5.48511 11.915 5.48511H15.6279C16.6671 5.48511 17.0992 6.81488 16.2585 7.42569L13.2547 9.60809C12.8787 9.88126 12.7214 10.3654 12.865 10.8074L14.0123 14.3386C14.3335 15.327 13.2023 16.1488 12.3616 15.538L9.35775 13.3556C8.98178 13.0824 8.47266 13.0824 8.09669 13.3556L5.09287 15.538C4.25216 16.1488 3.12099 15.327 3.44211 14.3386L4.58947 10.8074C4.73308 10.3654 4.57575 9.88126 4.19978 9.60809L1.19596 7.42569C0.355248 6.81488 0.787317 5.48511 1.82649 5.48511H5.53942C6.00415 5.48511 6.41603 5.18586 6.55964 4.74387L7.707 1.21267Z" fill="#6366F1" data-path="0.2.0.0.0.1.3.0.0.0.0.0" />
                                                </svg>
                                            </div>
                                            <div className="w-auto p-0.5">
                                                <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M7.707 1.21267C8.02812 0.224357 9.42632 0.224357 9.74744 1.21267L10.8948 4.74387C11.0384 5.18586 11.4503 5.48511 11.915 5.48511H15.6279C16.6671 5.48511 17.0992 6.81488 16.2585 7.42569L13.2547 9.60809C12.8787 9.88126 12.7214 10.3654 12.865 10.8074L14.0123 14.3386C14.3335 15.327 13.2023 16.1488 12.3616 15.538L9.35775 13.3556C8.98178 13.0824 8.47266 13.0824 8.09669 13.3556L5.09287 15.538C4.25216 16.1488 3.12099 15.327 3.44211 14.3386L4.58947 10.8074C4.73308 10.3654 4.57575 9.88126 4.19978 9.60809L1.19596 7.42569C0.355248 6.81488 0.787317 5.48511 1.82649 5.48511H5.53942C6.00415 5.48511 6.41603 5.18586 6.55964 4.74387L7.707 1.21267Z" fill="#6366F1" data-path="0.2.0.0.0.1.3.0.0.0.0.0" />
                                                </svg>
                                            </div>
                                            <div className="w-auto p-0.5">
                                                <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M7.707 1.21267C8.02812 0.224357 9.42632 0.224357 9.74744 1.21267L10.8948 4.74387C11.0384 5.18586 11.4503 5.48511 11.915 5.48511H15.6279C16.6671 5.48511 17.0992 6.81488 16.2585 7.42569L13.2547 9.60809C12.8787 9.88126 12.7214 10.3654 12.865 10.8074L14.0123 14.3386C14.3335 15.327 13.2023 16.1488 12.3616 15.538L9.35775 13.3556C8.98178 13.0824 8.47266 13.0824 8.09669 13.3556L5.09287 15.538C4.25216 16.1488 3.12099 15.327 3.44211 14.3386L4.58947 10.8074C4.73308 10.3654 4.57575 9.88126 4.19978 9.60809L1.19596 7.42569C0.355248 6.81488 0.787317 5.48511 1.82649 5.48511H5.53942C6.00415 5.48511 6.41603 5.18586 6.55964 4.74387L7.707 1.21267Z" fill="#6366F1" data-path="0.2.0.0.0.1.3.0.0.0.0.0" />
                                                </svg>
                                            </div>



                                        </div>
                                    </div>

                                    <div className="w-auto p-1">
                                        <div className="flex flex-wrap -m-0.5">
                                            <div className="w-auto p-0.5">
                                                <p className="text-gray-900 font-bold">
                                                    4.2/5
                                                </p>
                                            </div>

                                            <div className="w-auto p-0.5">
                                                <p className="text-gray-600 font-medium">
                                                    (45k Reviews)
                                                </p>
                                            </div>

                                        </div>

                                    </div>

                                </div>

                            </div>

                        </div>
              
                        <div className="w-full md:w-8/12 lg:w-8/12  flex justify-end items-center xl:w-8/12 p-8">
                            <div className="flex items-center lg:justify-end -m-3">
                                <div className="w-auto flex-wrap lg:w-1/3 xl:w-1/3 p-3">
                  
                                    <div className="flex flex-wrap justify-end">
                                        <div className="w-auto">
                                            <img className="mx-auto transform"
                                                src="https://shuffle.dev/flaro-assets/images/headers/people.png"
                                                alt=""
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="w-auto lg:w-1/3  p-3">
                                    <div className="flex flex-wrap justify-center -m-3">
                                        <div className="w-auto p-3">
                                            <a>
                                                <img className="mx-auto transform"
                                                    src="https://shuffle.dev/flaro-assets/images/headers/video.png"
                                                    alt=""
                                                />
                                            </a>
                                        </div>
                                        <div className="w-auto p-3">
                                            <img className="mx-auto transform"
                                                src="https://shuffle.dev/flaro-assets/images/headers/people2.png"
                                                alt=""
                                            />
                                        </div>
                                    </div>

                                </div>

                                <div className="w-auto lg:w-1/3 p-3">
                                    <div className="flex flex-wrap">
                                        <div className="w-auto">
                                            <img className="mx-auto transform"
                                                src="https://shuffle.dev/flaro-assets/images/headers/people3.png"
                                                alt=""
                                            />
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
