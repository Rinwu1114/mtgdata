
'use client';

import { useRouter } from 'next/navigation';

export default function Navbar() {
    const router = useRouter();

    return (
        <nav className="w-full bg-gray-900 text-white p-4 backdrop-blur sticky top-0 z-20">
            <div className="flex items-center justify-between max-w-7xl mx-auto">
                {/* Logo on the left */}
                <div className="flex ">
                    <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-lg">MTG</span>
                    </div>
                </div>

                {/* Buttons on the right */}
                <div className="flex gap-4">
                    <button className="px-6 py-2 cursor-pointer bg-purple-800 hover:bg-purple-900 rounded-lg font-medium transition">
                        Login
                    </button>
                    <button 
                        onClick={() => router.push('/sets')}
                        className="px-6 py-2 cursor-pointer hover:text-gray-300 rounded-lg font-medium transition"
                    >
                        Sets
                    </button>
                    <button className="px-4 py-2 cursor-pointer hover:text-gray-300 rounded-lg font-medium transition">
                        Rules Search
                    </button>
                </div>
            </div>
        </nav>
    )
}
