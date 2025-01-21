import React from 'react';
import { Link } from 'react-router-dom';
import './MyHeader.css'; // Import file CSS

const MyHeader = () => {
    return (
        <header className="header">
            <div className="header-logo">
                <Link to="/"> {/* Bọc logo trong thẻ Link */}
                    <img
                        src="https://spencil.vn/wp-content/uploads/2024/07/mau-thiet-ke-logo-khach-san-SPencil-Agency-1-1024x768.jpg"
                        alt="Logo"
                    />
                </Link>
                <h1 className="header-title">Hotel Del Luna</h1>
            </div>
            <nav>
                <ul className="nav">
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/about">About</Link>
                    </li>
                    <li>
                        <Link to="/rooms">Rooms</Link>
                    </li>
                    <li>

                        <Link to="/login">Login</Link>
                    </li>
                    <li>
                        <Link to="/register">Register</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default MyHeader;