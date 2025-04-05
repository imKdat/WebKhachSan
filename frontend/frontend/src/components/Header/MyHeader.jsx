import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './MyHeader.css';

const MyHeader = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    let userName = localStorage.getItem('userName');

    return (
        <header className="header">
            <div className="header-logo">
                <Link to="/">
                    <img
                        src="https://spencil.vn/wp-content/uploads/2024/07/mau-thiet-ke-logo-khach-san-SPencil-Agency-1-1024x768.jpg"
                        alt="Logo"
                        className="logo-img"
                    />
                </Link>
            </div>
            <div className="menu-container">
                <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)}>
                    ☰ Menu
                </button>
                {menuOpen && (
                    <ul className="dropdown-menu">
                        <li><Link to="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
                        <li><Link to="/about" onClick={() => setMenuOpen(false)}>About</Link></li>
                        <li><Link to="/rooms" onClick={() => setMenuOpen(false)}>Rooms</Link></li>
                        {!userName && (
                            <li><Link to="/register" onClick={() => setMenuOpen(false)}>Register</Link></li>
                        )}
                        <li>
                            {!userName ? (
                                <Link to="/login" onClick={() => setMenuOpen(false)}>Login</Link>
                            ) : (
                                <Link to="/user/admin" onClick={() => setMenuOpen(false)}>Hello {userName}</Link>
                            )}
                        </li>
                    </ul>
                )}
            </div>
        </header>
    );
};

export default MyHeader;
