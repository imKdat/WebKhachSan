import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import './Update-Info-User.css';

const UpdateInfoUser = () => {
    const { id } = useParams();
    const [userInfo, setUserInfo] = useState({});
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    // Lấy thông tin user hiện tại khi component mount
    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/khachhang/${id}`, {
                    withCredentials: true
                });
                setUserInfo(response.data[0]);
            } catch (err) {
                console.error("Lỗi khi lấy thông tin người dùng:", err);
                setError('Không thể tải thông tin người dùng');
            }
        };

        fetchUserInfo();
    }, [id]);

    const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (name === "newPassword") {
            setNewPassword(value);
        } else if (name === "confirmPassword") {
            setConfirmPassword(value);
        } else {
            setUserInfo(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!validateEmail(userInfo.Email)) {
            setError('Email không hợp lệ');
            return;
        }

        let passwordToUpdate = userInfo.Password; // Giữ mật khẩu cũ nếu không nhập mới
        if (newPassword || confirmPassword) {
            if (newPassword.length < 6) {
                setError('Mật khẩu mới phải có ít nhất 6 ký tự');
                return;
            }

            if (newPassword !== confirmPassword) {
                setError('Mật khẩu xác nhận không trùng khớp');
                return;
            }

            passwordToUpdate = newPassword; // Lấy mật khẩu mới
        }

        try {
            const updateData = {
                fullname: userInfo.FullName,
                email: userInfo.Email,
                phonenumber: userInfo.PhoneNumber,
                username: userInfo.Username,
                idcard: userInfo.IDCard,
                password: passwordToUpdate  // Luôn gửi mật khẩu
            };

            console.log("Dữ liệu gửi đi:", updateData); // Debug

            const response = await axios.put(`http://localhost:5000/khachhang/update/${id}`, updateData, {
                withCredentials: true
            });

            if (response.status === 200) {
                setSuccess('Cập nhật thông tin thành công!');
                setTimeout(() => {
                    navigate('/user/admin');
                }, 1500);
            }
        } catch (err) {
            console.error("Lỗi khi cập nhật:", err);
            setError(err.response?.data?.message || 'Có lỗi xảy ra khi cập nhật thông tin');
        }
    };



    return (
        <div className="update-info-container">
            <h2>Cập Nhật Thông Tin Cá Nhân</h2>

            {error && <div className="error-message">{error}</div>}
            {success && <div className="success-message">{success}</div>}

            <form onSubmit={handleSubmit} className="update-info-form">
                <div className="form-group">
                    <label>Họ và tên</label>
                    <input
                        type="text"
                        name="FullName"
                        value={userInfo.FullName || ''}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Số điện thoại</label>
                    <input
                        type="text"
                        name="PhoneNumber"
                        value={userInfo.PhoneNumber || ''}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        name="Email"
                        value={userInfo.Email || ''}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>CMND/CCCD</label>
                    <input
                        type="text"
                        name="IDCard"
                        value={userInfo.IDCard || ''}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Tên đăng nhập</label>
                    <input
                        type="text"
                        name="Username"
                        value={userInfo.Username || ''}
                        disabled
                    />
                </div>

                {/* Trường nhập mật khẩu mới */}
                <div className="form-group">
                    <label>Mật khẩu mới (nếu muốn thay đổi)</label>
                    <input
                        type="password"
                        name="newPassword"
                        value={newPassword}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="form-group">
                    <label>Xác nhận lại mật khẩu</label>
                    <input
                        type="password"
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="form-actions">
                    <button type="submit" className="update-button">Cập nhật</button>
                    <button
                        type="button"
                        className="cancel-button"
                        onClick={() => navigate("/user/admin")}
                    >
                        Hủy bỏ
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UpdateInfoUser;
