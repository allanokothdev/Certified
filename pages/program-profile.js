


export default function BrandProfile() {
    return (
        <div>
            <>
                {/* component */}
                <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
                    <div className="relative max-w-xl w-full h-36 bg-white rounded-lg shadow-lg overflow-hidden mb-32">

                        <div className="absolute inset-0 rounded-lg overflow-hidden bg-red-200">
                            <img
                                src="https://images.unsplash.com/photo-1543794327-59a91fb815d1?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=200&q=80"
                                alt=""
                            />
                            <div className="absolute inset-0 backdrop backdrop-blur-10 bg-gradient-to-b from-transparent to-black"></div>
                        </div>

                        <div className="absolute flex space-x-6 transform translate-x-6 translate-y-8">
                            <div className="w-36 h-36 rounded-lg shadow-lg overflow-hidden">
                                <img
                                    src="https://images.unsplash.com/photo-1543794327-59a91fb815d1?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80"
                                    alt=""
                                />
                            </div>

                            <div className="text-white pt-12">
                                <h3 className="font-bold">Brand Name</h3>
                                <div className="text-sm opacity-60">Brand Summary</div>
                                <div className="mt-8 text-gray-400">
                                    <div className="flex items-center space-x-2 text-xs">
                                        <svg
                                            className="w-4 h-4"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth={2}
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
                                            <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
                                        </svg>
                                        <span>Brand Categories</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Next Components */}
                </div>
            </>
        </div>
    );
}
