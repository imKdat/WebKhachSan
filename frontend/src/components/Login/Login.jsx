import  { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Login.css"

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // Sử dụng useNavigate

    const handleLogin = (e) => {
        e.preventDefault();
        if (username === 'admin' && password === 'password') {
            navigate('/'); // Sử dụng navigate để chuyển hướng
        } else {
            alert('Thông tin đăng nhập không chính xác!');
        }
    };

    return (
        <div className="login-container">
            <h2>Đăng Nhập</h2>
            <form onSubmit={handleLogin}>
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
                <button type="submit">Đăng Nhập</button>
            </form>
        </div>
    );
};

export default Login;