import React from 'react';
import {Link} from 'react-router-dom';
import './MyHeader.css'; // Import file CSS

const MyHeader = () => {
    let userName = localStorage.getItem('userName');
    return (
        <header className="header">
            <div className="header-logo">
                <Link to="/">
                    <img
                        src="https://spencil.vn/wp-content/uploads/2024/07/mau-thiet-ke-logo-khach-san-SPencil-Agency-1-1024x768.jpg"
                        alt="Logo"
                    />
                </Link>
                <Link to='/'>
                    <h1 className="header-title">Hotel Gia Dinh</h1>
                </Link>
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
                        <Link to="/register">Register</Link>
                    </li>
                    <li>
                        {!userName ? (<Link to="/login">Login</Link>
                        ) : (<Link to="/user/:id">Hello {userName}</Link>)}
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default MyHeader;