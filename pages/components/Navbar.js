import React from 'react';
import SocialLogin from '@biconomy/web3-auth'
import { ChainId } from '@biconomy/core-types'
import { css } from '@emotion/css'

export default function NavBar() {

    const [smartAccount, setSmartAccount] = useState < SmartAccount | null > (null)
    const [interval, enableInterval] = useState(false)
    const sdkRef = useRef < SocialLogin | null > (null)
    const [loading, setLoading] = useState < boolean > (false)

    useEffect(() => {
        let configureLogin
        if (interval) {
            configureLogin = setInterval(() => {
                if (!!sdkRef.current?.provider) {
                    setupSmartAccount()
                    clearInterval(configureLogin)
                }
            }, 1000)
        }
    }, [interval])

    async function login() {
        if (!sdkRef.current) {
            const socialLoginSDK = new SocialLogin()
            const signature1 = await socialLoginSDK.whitelistUrl('https://biconomy-social-auth.vercel.app')
            await socialLoginSDK.init({
                chainId: ethers.utils.hexValue(ChainId.POLYGON_MAINNET),
                whitelistUrls: {
                    'https://biconomy-social-auth.vercel.app': signature1,
                }
            })
            sdkRef.current = socialLoginSDK
        }
        if (!sdkRef.current.provider) {
            // sdkRef.current.showConnectModal()
            sdkRef.current.showWallet()
            enableInterval(true)
        } else {
            setupSmartAccount()
        }
    }

    async function setupSmartAccount() {
        if (!sdkRef?.current?.provider) return
        sdkRef.current.hideWallet()
        setLoading(true)
        const web3Provider = new ethers.providers.Web3Provider(
            sdkRef.current.provider
        )
        try {
            const smartAccount = new SmartAccount(web3Provider, {
                activeNetworkId: ChainId.POLYGON_MAINNET,
                supportedNetworksIds: [ChainId.POLYGON_MAINNET],
            })
            await smartAccount.init()
            setSmartAccount(smartAccount)
            setLoading(false)
        } catch (err) {
            console.log('error setting up smart account... ', err)
        }
    }

    const logout = async () => {
        if (!sdkRef.current) {
            console.error('Web3Modal not initialized.')
            return
        }
        await sdkRef.current.logout()
        sdkRef.current.hideWallet()
        setSmartAccount(null)
        enableInterval(false)
    }

    return (
        <section className="overflow-hidden">
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
                                    <a href="/">Home</a>
                                </li>
                                <li className="mr-9 font-medium hover:text-indigo-600">
                                    <a href="programs">Programs</a>
                                </li>
                                <li className="mr-9 font-medium hover:text-indigo-600">
                                    <a href="professionals">Professionals</a>
                                </li>
                                <li className="font-medium hover:text-indigo-600">
                                    <a href="contact">Contacts</a>
                                </li>
                            </ul>
                        </div>
                    </div>

                </div>

                <div className="w-auto">
                    <div className="flex flex-wrap items-center">
                        <div className="w-auto hidden lg:block">
                            <div className="inline-block">
                                <a href="wallet" className="inline-flex items-center w-full px-6 py-3 text-sm font-medium leading-4 text-white bg-indigo-600 md:px-3 md:w-auto md:rounded-full lg:px-5 hover:bg-indigo-500 focus:outline-none md:focus:ring-2 focus:ring-0 focus:ring-offset-2 focus:ring-indigo-600">Sign In</a>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </section>
    );
}


