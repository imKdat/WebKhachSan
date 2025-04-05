import {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import "./Login.css";

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e, isAdmin) => {
        e.preventDefault();

        const endpoint = isAdmin ? "http://localhost:5000/nhanvien/login" : "http://localhost:5000/khachhang/login";

        try {
            const response = await axios.post(endpoint, {
                username,
                password,
            }, { withCredentials: true });

            if (response.status === 200) {
                if (response.data.role === "KhachHang") {
                    localStorage.setItem("userName", response.data.username);
                    localStorage.setItem("userRole", response.data.role);
                    localStorage.setItem("userID", response.data.id);

                } else {
                    localStorage.setItem("userName", response.data.username);
                    localStorage.setItem("userRole", response.data.role);
                    localStorage.setItem("userID", response.data.id);
                    localStorage.setItem("fullName", response.data.fullname);
                }


                // Xóa thông báo lỗi (nếu có) và chuyển hướng
                setError('');
                navigate('/');
            }
        } catch (err) {
            setError(err.response?.data || "Đăng nhập thất bại!");
        }
    };

    return (
        <div className="login-container">
            <h2>Đăng Nhập</h2>
            {error && <div className="error">{error}</div>}
            <form onSubmit={(e) => handleLogin(e, false)}>
                <div>
                    <label>Tên đăng nhập:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Mật khẩu:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Đăng Nhập Khách Hàng</button>
                <button type="button" onClick={(e) => handleLogin(e, true)}>Đăng Nhập Nhân Viên</button>
                <div className="register-link">
                    Chưa có tài khoản? <Link to="/register">Đăng ký ngay</Link>
                </div>
            </form>
        </div>
    );
};

export default Login;
