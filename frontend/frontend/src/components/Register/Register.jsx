import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import './Register.css';

const Register = () => {
    const [fullname, setFullname] = useState('');
    const [phonenumber, setPhonenumber] = useState('');
    const [email, setEmail] = useState('');
    const [idcard, setIdcard] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!fullname || !phonenumber || !email || !idcard || !username || !password || !password2) {
            setError('Vui lòng điền tất cả các trường.');
            setSuccess('');
            return;
        }

        if (!validateEmail(email)) {
            setError('Email không hợp lệ.');
            setSuccess('');
            return;
        }

        if (password.length < 6) {
            setError('Mật khẩu phải có ít nhất 6 ký tự.');
            setSuccess('');
            return;
        }

        if (password !== password2) {
            setError('Mật khẩu không trùng khớp.');
            setSuccess('');
            return;
        }

        try {
            const response = await axios.post("http://localhost:5000/khachhang/create", {
                fullname,
                phonenumber,
                email,
                idcard,
                username,
                password
            },{withCredentials: true});

            if (response.status === 200) {
                setSuccess(`Người dùng ${fullname} đã đăng ký thành công!`);
                setError('');
                setTimeout(() => navigate('/login'), 1000);
            } else {
                setError('Đăng ký thất bại.');
                setSuccess('');
            }
        } catch (err) {
            setError('Lỗi khi đăng ký, vui lòng thử lại.');
            setSuccess('');
        }
    };

    return (
        <div className="register-container">
            <h2>Đăng Ký</h2>
            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>}
            <form onSubmit={handleSubmit} className="register-form">
                <label>Họ và tên</label>
                <input type="text" placeholder="Họ và tên" value={fullname} onChange={(e) => setFullname(e.target.value)} required />

                <label>Số điện thoại</label>
                <input type="text" placeholder="Số điện thoại" value={phonenumber} onChange={(e) => setPhonenumber(e.target.value)} required />

                <label>Email</label>
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />

                <label>CMND/CCCD</label>
                <input type="text" placeholder="CMND/CCCD" value={idcard} onChange={(e) => setIdcard(e.target.value)} required />

                <label>Tên đăng nhập</label>
                <input type="text" placeholder="Tên đăng nhập" value={username} onChange={(e) => setUsername(e.target.value)} required />

                <label>Mật khẩu</label>
                <input type="password" placeholder="Mật khẩu" value={password} onChange={(e) => setPassword(e.target.value)} required />

                <label>Xác Nhận Mật Khẩu</label>
                <input type="password" placeholder="Xác Nhận Mật Khẩu" value={password2} onChange={(e) => setPassword2(e.target.value)} required />

                <button type="submit" className="register-button">Đăng ký</button>
            </form>
            <p className="login-link">Bạn đã có tài khoản? <a href="/login">Đăng nhập</a></p>
        </div>
    );
};

export default Register;
