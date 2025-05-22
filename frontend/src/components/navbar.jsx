import { useState } from 'react';

function Navbar() {
    const [showModal, setShowModal] = useState(false);

    return (
        <nav className="flex flex-col sm:flex-row justify-between items-center bg-orange-500 text-white px-4 sm:px-6 py-4 shadow-md">
            <div className="text-2xl font-bold mb-2 sm:mb-0">MyLogo</div>

            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
                <button className="bg-white text-orange-500 px-4 py-2 rounded hover:bg-orange-100 transition w-full sm:w-auto">Home</button>
                <button className="bg-white text-orange-500 px-4 py-2 rounded hover:bg-orange-100 transition w-full sm:w-auto">Features</button>
                <button className="bg-white text-orange-500 px-4 py-2 rounded hover:bg-orange-100 transition w-full sm:w-auto">Contact</button>
                
                <div className="relative">
                    <img
                        src="/profile-icon.png"
                        alt="Profile"
                        className="w-8 h-8 rounded-full cursor-pointer"
                        onClick={() => setShowModal(!showModal)}
                    />
                    {showModal && (
                        <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded shadow-lg z-10 p-3 space-y-2">
                            <p className="hover:bg-gray-100 px-2 py-1 rounded cursor-pointer">View Profile</p>
                            <p className="hover:bg-gray-100 px-2 py-1 rounded cursor-pointer">Settings</p>
                            <p className="hover:bg-gray-100 px-2 py-1 rounded cursor-pointer">Logout</p>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;