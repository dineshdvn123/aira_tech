import React, { useState } from "react";
import logo from "../../assets/Aira_Tech_Logo.png";
import "./NavBar.css";
import { Link, NavLink } from "react-router-dom";

const NavBar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const handleLinkClick = () => {
        setMenuOpen(false);
    };

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
                    <NavLink to="/" onClick={handleLinkClick}>Home</NavLink>
                </li>
                {/* <li>
                    <NavLink to="/services" onClick={handleLinkClick}>Services</NavLink>
                </li> */}
                <li>
                    <NavLink to="/contact" onClick={handleLinkClick}>Contact</NavLink>
                </li>
                <li>
                    <NavLink to="/careers" onClick={handleLinkClick}>Careers</NavLink>
                </li>
            </ul>
        </nav>
    );
};

export default NavBar;
