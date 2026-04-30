import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Search from "../Search/Search";
import { useSelector } from "react-redux";

const Header = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { isAuthenticated, loaduser } = useSelector((state) => state.user);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate("/login");
    };

    const toggleSidebar = () => {
        setIsSidebarOpen((prev) => !prev);
    };

    return (
        <header className="sticky top-0 z-50 bg-white shadow-sm flex items-center h-16 px-3">

            {/* Logo */}
            <Link to="/" onClick={() => setIsSidebarOpen(false)} className="flex items-center justify-center p-3 rounded-full hover:bg-gray-100 transition-colors">
                <svg className="w-6 h-6 text-[#e60023]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.279 1.14c-.038.154-.127.187-.285.113-1.06-.499-1.721-2.065-1.721-3.322 0-2.704 1.966-5.183 5.659-5.183 2.969 0 5.276 2.113 5.276 4.939 0 2.951-1.859 5.326-4.444 5.326-1.127 0-2.188-.585-2.55-1.278l-.693 2.639c-.25 .954-.925 2.148-1.378 2.877C10.027 23.854 10.995 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/>
                </svg>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center ml-2 space-x-1">
                <Link
                    to="/"
                    className={`px-4 py-2 rounded-full font-semibold ${location.pathname === '/'
                            ? 'bg-black text-white'
                            : 'text-gray-900 hover:bg-gray-100'
                        }`}
                >
                    Home
                </Link>

                <Link
                    to="/create"
                    className={`px-4 py-2 rounded-full font-semibold ${location.pathname === '/create'
                            ? 'bg-black text-white'
                            : 'text-gray-900 hover:bg-gray-100'
                        }`}
                >
                    Create
                </Link>
            </div>

            {/* Search */}
            <div className="flex-1 px-4">
                <Search />
            </div>

            {/* Right Side */}
            <div className="flex items-center space-x-2">

                {/* Mobile Menu Button */}
                <button onClick={toggleSidebar} className="md:hidden p-2 rounded-full hover:bg-gray-100">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                            d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>

                {/* Sidebar Overlay */}
                <div
                    className={`md:hidden fixed inset-0 bg-black/50 z-40 transition ${isSidebarOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
                        }`}
                    onClick={() => setIsSidebarOpen(false)}
                />

                {/* Sidebar */}
                <div
                    className={`fixed right-0 top-0 h-full w-64 bg-white z-50 shadow-lg transform transition-transform ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'
                        } md:static md:translate-x-0 md:h-auto md:w-auto md:bg-transparent md:shadow-none md:flex md:items-center`}
                >

                    <div className="p-4 md:hidden flex justify-between items-center border-b">
                        <span className="font-bold">Menu</span>
                        <button onClick={toggleSidebar}>
                            ✕
                        </button>
                    </div>

                    <div className="flex flex-col md:flex-row md:items-center p-4 md:p-0 space-y-3 md:space-y-0 md:space-x-2">

                        <Link to="/" onClick={() => setIsSidebarOpen(false)} className="md:hidden">Home</Link>
                        <Link to="/create" onClick={() => setIsSidebarOpen(false)} className="md:hidden">Create</Link>

                        {isAuthenticated && loaduser ? (
                            <>
                                <Link to={`/profile/${loaduser._id}`} onClick={() => setIsSidebarOpen(false)}>
                                    <img
                                        src={loaduser.userimage?.url || 'https://via.placeholder.com/150'}
                                        alt="Profile"
                                        className="w-9 h-9 rounded-full object-cover border"
                                    />
                                </Link>

                                <button
                                    onClick={() => { handleLogout(); setIsSidebarOpen(false); }}
                                    className="px-4 py-2 bg-gray-100 rounded-full hover:bg-gray-200"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <Link
                                to="/login"
                                onClick={() => setIsSidebarOpen(false)}
                                className="px-4 py-2 bg-red-600 text-white rounded-full hover:bg-red-700"
                            >
                                Log in
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;