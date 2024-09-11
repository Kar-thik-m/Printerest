import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Search from "../Search/Search";
import Logo from "../../../assets/logo.jpeg";
import HStyle from "../Header/Header.module.css";
import { useSelector } from "react-redux";

const Header = () => {
    const navigate = useNavigate();
    const { isAuthenticated } = useSelector((state) => state.user);

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate("/login");
    };

    return (
        <header className={HStyle.header}>
            <div className={HStyle.logo}>
                <Link to="/">
                    <img src={Logo} alt="Site Logo" className={HStyle.logoimage} />
                </Link>
                <Link to="/" className={HStyle.navlink}>HOME</Link>
                <Link to="/create" className={HStyle.navlink}>Upload</Link>
            </div>

            <div className={HStyle.search}>
                <Search />
            </div>

            <div className={HStyle.authlinks}>
                {isAuthenticated ? (
                    <>
                        <Link to="/profile" className={HStyle.profilelink}>Profile</Link>

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
