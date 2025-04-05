import {useState} from "react";
import {useNavigate} from "react-router-dom";
import "./AddEmployee.css";
import axios from "axios";

export default function AddEmployee() {
    const navigate = useNavigate();
    const [employee, setEmployee] = useState({
        FullName: "",
        PhoneNumber: "",
        Email: "",
        Username: "",
        Password: "",
        Role: "Admin" // Mặc định là Staff
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setEmployee(prev => ({...prev, [name]: value}));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        // Validate cơ bản
        if (!employee.FullName || !employee.PhoneNumber || !employee.Email || !employee.Username || !employee.Password) {
            setError("Vui lòng điền đầy đủ thông tin");
            setLoading(false);
            return;
        }

        try {
            await axios.post("http://localhost:5000/nhanvien/create", {
                fullname: employee.FullName,
                phonenumber: employee.PhoneNumber,
                email: employee.Email,
                username: employee.Username,
                password: employee.Password,
                role: employee.Role,
            },{withCredentials: true});


            alert("Thêm nhân viên thành công!");
            navigate(-1);
        } catch (err) {
            setError(err.message);
            console.error("Error adding employee:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="add-employee-container">
            <h2>Thêm Nhân Viên Mới</h2>

            <form onSubmit={handleSubmit} className="employee-form">
                {error && <div className="error-message">{error}</div>}

                <div className="form-group">
                    <label>Họ và Tên:</label>
                    <input
                        type="text"
                        name="FullName"
                        value={employee.FullName}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Số Điện Thoại:</label>
                    <input
                        type="tel"
                        name="PhoneNumber"
                        value={employee.PhoneNumber}
                        onChange={handleChange}
                        required
                        pattern="[0-9]{10,11}"
                        title="Số điện thoại phải có 10-11 chữ số"
                    />
                </div>

                <div className="form-group">
                    <label>Email:</label>
                    <input
                        type="email"
                        name="Email"
                        value={employee.Email}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Tên Đăng Nhập:</label>
                    <input
                        type="text"
                        name="Username"
                        value={employee.Username}
                        onChange={handleChange}
                        required
                        minLength="4"
                    />
                </div>

                <div className="form-group">
                    <label>Mật Khẩu:</label>
                    <input
                        type="password"
                        name="Password"
                        value={employee.Password}
                        onChange={handleChange}
                        required
                        minLength="6"
                    />
                </div>

                <div className="form-group">
                    <label>Vai Trò:</label>
                    <select
                        name="Role"
                        value={employee.Role}
                        onChange={handleChange}
                        required
                    >
                        <option value="Admin">Admin</option>
                        <option value="NhanVien">Staff</option>
                    </select>
                </div>

                <div className="form-actions">
                    <button type="submit" disabled={loading}>
                        {loading ? "Đang thêm..." : "Thêm Nhân Viên"}
                    </button>
                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        className="cancel-btn"
                    >
                        Hủy Bỏ
                    </button>
                </div>
            </form>
        </div>
    );
}