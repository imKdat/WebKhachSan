import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import "./ListEmplyee.css";
import axios from "axios";

export default function EmployeeList() {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // Fetch danh sách nhân viên
    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await axios.get("http://localhost:5000/nhanvien", {withCredentials: true});
                const data = await response.data;
                setEmployees(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchEmployees();
    }, []);

    // Hàm xóa nhân viên
    const handleDelete = async (id) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa nhân viên này?")) {
            try {
                await axios.delete(`http://localhost:5000/nhanvien/delete/${id}`, {withCredentials: true});


                // Cập nhật lại danh sách sau khi xóa
                setEmployees(employees.filter(emp => emp.NhanVienID !== id));
                alert("Xóa nhân viên thành công!");
            } catch (err) {
                setError(err.message);
            }
        }
    };

    if (loading) return <div className="loading">Đang tải...</div>;
    if (error) return <div className="error">Lỗi: {error}</div>;

    return (<div className="employee-list-container">
        <div className="header">
            <h2>Danh Sách Nhân Viên</h2>
            <button
                className="add-button"
                onClick={() => navigate("/add-employee")}
            >
                Thêm Nhân Viên
            </button>
        </div>

        <table className="employee-table">
            <thead>
            <tr>
                <th>ID</th>
                <th>Họ và Tên</th>
                <th>Số Điện Thoại</th>
                <th>Email</th>
                <th>Tên Đăng Nhập</th>
                <th>Vai Trò</th>
                <th>Thao Tác</th>
            </tr>
            </thead>
            <tbody>
            {employees.map((employee) => (<tr key={employee.NhanVienID}>
                <td>{employee.NhanVienID}</td>
                <td>{employee.FullName}</td>
                <td>{employee.PhoneNumber}</td>
                <td>{employee.Email}</td>
                <td>{employee.Username}</td>
                <td>{employee.Role}</td>
                <td className="actions">
                    <button
                        className="edit-btn"
                        onClick={() => navigate(`/update/${employee.NhanVienID}`)}
                    >
                        Sửa
                    </button>
                    <button
                        className="delete-btn"
                        onClick={() => handleDelete(employee.NhanVienID)}
                    >
                        Xóa
                    </button>
                </td>
            </tr>))}
            </tbody>
        </table>
    </div>);
}