import React from 'react';
import './Home.css'; // Import file CSS
import { Link } from "react-router-dom";
import logo from "./logo.png";
import Banner from "../HomePage/Banner";
import {useEffect, useState} from "react";
import axios from "axios";

const Home = () => {
    let userName = localStorage.getItem('userName');
    return (
        <div className="home">
            {/* Phần Banner ở trên cùng */}
            <Banner />

            <div className="hero">
                <h2>Welcome to Hotel Marvella</h2>
                {userName ? (<div>Xin chào {userName}</div>) : (<div>Hello</div>)}
                <p>Trải nghiệm kỳ nghỉ tuyệt vời với dịch vụ hoàn hảo và không gian sang trọng.</p>

                {/* Thêm video */}
                <video className="promo-video" autoPlay loop muted>
                    <source src="/video/marvella.mp4" type="video/mp4" />
                    Trình duyệt của bạn không hỗ trợ video.
                </video>

                <Link to="/rooms">
                    <button className="btn-book-now">Đặt phòng ngay</button>
                </Link>
            </div>

            {/* Thêm phần Accommodation */}
            <div className="accommodation">
    {/* Hình ảnh bên trái */}
    <div className="room-list">
        <div className="room">
            <img src="/anhphong/phong101.jpg" alt="Superior King Room" />
            <h3>SUPERIOR KING ROOM</h3>
        </div>
        <div className="room">
            <img src="/anhphong/phong102.jpg" alt="Deluxe King Room" />
            <h3>DELUXE KING ROOM</h3>
        </div>
    </div>

    {/* Phần chữ bên phải */}
    <div className="accommodation-text">
        <h2 className="accommodation-title">ACCOMMODATION</h2>
        <p className="accommodation-description">
            With an extensive range of room types inspired by Art Déco, our well-furnished rooms and suites are 
            excellent choices for the view of Nha Trang bay. It is near impossible not to fall in love with 
            impeccable moments when all of our accommodations welcome you with the picture-perfect seascape, 
            one filled with turquoise and lapping ocean waves.
        </p>
    </div>
</div>

        </div>
    );
};

export default Home;
