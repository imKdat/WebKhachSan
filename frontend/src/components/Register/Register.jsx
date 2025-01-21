import React, { useState } from 'react';
import './Register.css'; // Import file CSS nếu cần

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name || !email || !password) {
            setError('Vui lòng điền tất cả các trường.');
            setSuccess('');
        } else {
            setError('');
            setSuccess(`Người dùng ${name} đã đăng ký thành công!`);
            // Xử lý đăng ký ở đây (gửi dữ liệu đến server, v.v.)
        }
    };

    return (
        <div className="register-container">
            <h2>Đăng Ký</h2>
            {error && <div className="error">{error}</div>}
            {success && <div className="success">{success}</div>}
            <form onSubmit={handleSubmit}>
                <label>
                    Tên:
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                </label>
                <label>
                    Email:
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </label>
                <label>
                    Mật khẩu:
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </label>
                <button type="submit">Đăng Ký</button>
            </form>
        </div>
    );
};

export default Register;