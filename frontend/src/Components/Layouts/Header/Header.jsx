import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Search from "../Search/Search";
import Logo from "../../../assets/logo.jpeg";
import { useSelector } from "react-redux";

const Header = () => {
    const navigate = useNavigate();
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
        <header className="flex justify-between items-center py-2.5 px-5 bg-white shadow-[0_2px_5px_rgba(0,0,0,0.1)]">
            <div className="flex items-center">
                <Link to="/">
                    <img src={Logo} alt="Site Logo" className="w-[40px] h-auto" />
                </Link>
            </div>

            <div className="flex-1 mx-5">
                <Search />
            </div>

            <div className="hidden max-[853px]:block">
                <button onClick={toggleSidebar} className="hidden max-[853px]:inline max-[853px]:mr-4">{isSidebarOpen ? <i className="fa fa-times" aria-hidden="true"></i> : "☰"}</button>
            </div>

            <div className={`flex items-center ${isSidebarOpen ? 'max-[853px]:flex max-[853px]:flex-col max-[853px]:fixed max-[853px]:right-0 max-[853px]:top-0 max-[853px]:w-[200px] max-[853px]:bg-white max-[853px]:shadow-[0_2px_5px_rgba(0,0,0,0.1)] max-[853px]:z-[1000] max-[853px]:p-2.5 max-[853px]:gap-4' : 'max-[853px]:hidden'}`}>
                {isSidebarOpen ? <div className="w-full flex flex-col items-start p-2.5">
                    <button onClick={toggleSidebar} className="border-none p-2.5 text-lg w-full text-left bg-transparent transition-colors duration-300 hover:bg-[#f0f0f0]">{isSidebarOpen ? <i className="fa fa-times" aria-hidden="true"></i> : "☰"}</button>
                </div> : ""}
                <Link to="/" className="mx-2.5 font-bold text-[#333] py-2.5 px-[15px] rounded-[5px] transition-colors duration-300 hover:bg-[#f0f0f0]">HOME</Link>
                <Link to="/create" className="mx-2.5 font-bold text-[#333] py-2.5 px-[15px] rounded-[5px] transition-colors duration-300 hover:bg-[#f0f0f0]">Upload</Link>
                {loaduser && isAuthenticated ? (
                    <>
                        <Link to={`/profile/${loaduser._id}`} className="mx-2.5 font-bold text-[#333] py-2.5 px-[15px] rounded-[5px] transition-colors duration-300 hover:bg-[#f0f0f0]">Profile</Link>
                        <button onClick={handleLogout} className="bg-none border-none text-[#ff4d4d] font-bold cursor-pointer transition-colors duration-300 hover:text-[#d00000]">Logout</button>
                    </>
                ) : (
                    <Link to="/login" className="mx-2.5 font-bold text-[#333] py-2.5 px-[15px] rounded-[5px] transition-colors duration-300 hover:bg-[#f0f0f0]">Login</Link>
                )}
            </div>
        </header>
    );
}

export default Header;
