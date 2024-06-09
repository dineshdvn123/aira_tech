import React, { useState } from "react";
import logo from "../../assets/Aira_Tech_Logo.png"
import "./NavBar.css";
import { Link, NavLink } from "react-router-dom";

const NavBar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav>
            <div className="logo_title">
                <img src={logo} alt="logo" className="logo" />
                <Link to="/" className="title">
                    AiraTech
                </Link>
            </div>
            <div className="menu" onClick={() => setMenuOpen(!menuOpen)}>
                <span></span>
                <span></span>
                <span></span>
            </div>
            <ul className={menuOpen ? "open" : ""}>
                <li>
                    <NavLink to="/">Home</NavLink>
                </li>
                {/* <li>
                    <NavLink to="/services">Services</NavLink>
                </li> */}
                <li>
                    <NavLink to="/contact">Contact</NavLink>
                </li>
            </ul>
        </nav>
    );
};

export default NavBar;