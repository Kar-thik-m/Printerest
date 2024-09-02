import React from "react";
import { Link } from "react-router-dom";
import Search from "../Search/Search";
import Logo from "../../../assets/logo.jpeg"
import HStyle from "../Header/Header.module.css";
const Header = () => {
    return (
        <header className={HStyle.header}>
            <div className={HStyle.logo}>
                <Link to="/">
                    <img src={Logo} alt="Logo" className={HStyle.logoimage} />
                </Link>
                <Link to="/" className={HStyle.navlink}>HOME</Link>
            <Link to="/create" className={HStyle.navlink}>Upload</Link>
            </div>
           
            <div className={HStyle.search}>
                <Search />
            </div>
            <div className={HStyle.authlinks}>
                <Link to="/login" className={HStyle.loginlink}>Login</Link>
            </div>
        </header>
    );
}

export default Header;
