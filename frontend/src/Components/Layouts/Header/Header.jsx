import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Search from "../Search/Search";
import Logo from "../../../assets/logo.jpeg";
import HStyle from "../Header/Header.module.css";
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
    console.log(isSidebarOpen)
    return (
        <header className={HStyle.header}>
            <div className={HStyle.logo}>
                <Link to="/">
                    <img src={Logo} alt="Site Logo" className={HStyle.logoimage} />
                </Link>
            </div>

            <div className={HStyle.search}>
                <Search />
            </div>

            <div className={HStyle.togglebutton}>
                <button onClick={toggleSidebar} className={HStyle.burgerBtn}>{isSidebarOpen ? <i class="fa fa-times" aria-hidden="true"></i> : "☰"}</button>
            </div>

            <div className={`${HStyle.authlinks} ${isSidebarOpen ? HStyle.show : ''}`}>
                {isSidebarOpen ? <div className={HStyle.innertogglebutton}>
                    <button onClick={toggleSidebar} className={HStyle.innerburgerBtn}>{isSidebarOpen ? <i class="fa fa-times" aria-hidden="true"></i> : "☰"}</button>
                </div> : ""}
                <Link to="/" className={HStyle.navlink}>HOME</Link>
                <Link to="/create" className={HStyle.navlink}>Upload</Link>
                {loaduser && isAuthenticated ? (
                    <>
                        <Link to={`/profile/${loaduser._id}`} className={HStyle.profilelink}>Profile</Link>
                        <button onClick={handleLogout} className={HStyle.logoutlink}>Logout</button>
                    </>
                ) : (
                    <Link to="/login" className={HStyle.loginlink}>Login</Link>
                )}
            </div>
        </header>
    );
}

export default Header;
