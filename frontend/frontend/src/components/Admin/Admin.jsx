import {useNavigate, useParams} from "react-router-dom";
import {useState, useEffect} from "react";
import "./Admin.css";
import axios from "axios";

export default function Admin() {
    const navigate = useNavigate();
    const [adminInfo, setAdminInfo] = useState([]);
    const id = localStorage.getItem("userID");
    useEffect(() => {
        if (localStorage.getItem("userRole") === "Admin" || "NhanVien") {
            const userName = localStorage.getItem("userName");
            const userRole = localStorage.getItem("userRole");
            const userID = localStorage.getItem("userID");
            const fullName = localStorage.getItem("fullName");
            if (userName && userRole && userID) {
                setAdminInfo({
                    userName,
                    userRole,
                    userID,
                    fullName
                });
            }
        } else {
            const userName = localStorage.getItem("userName");
            const userRole = localStorage.getItem("userRole");
            const userID = localStorage.getItem("userID");
            if (userName && userRole && userID) {
                setAdminInfo({
                    userName,
                    userRole,
                    userID
                });
            }
        }
        // Set the retrieved data to the adminInfo state

    }, []);


    const handleLogout = async () => {
        if (localStorage.getItem("userRole") === "Admin") {
            try {
                // Call the logout API (no headers required)
                await axios.get("http://localhost:5000/nhanvien/logout",{withCredentials: true});

                // Clear user data from localStorage
                localStorage.removeItem("fullname");
                localStorage.removeItem("userName");
                localStorage.removeItem("userRole");
                localStorage.removeItem("userID");

                // Redirect to the login page
                navigate('/login');
            } catch (err) {
                console.error("Logout failed:", err);
                // Handle logout failure (e.g., show an error message)
            }
        } else {
            try {
                // Call the logout API (no headers required)
                await axios.get("http://localhost:5000/khachhang/logout",{withCredentials: true});

                // Clear user data from localStorage
                localStorage.removeItem("userName");
                localStorage.removeItem("userRole");
                localStorage.removeItem("userID");

                // Redirect to the login page
                navigate('/login');
            } catch (err) {
                console.error("Logout failed:", err);
                // Handle logout failure (e.g., show an error message)
            }
        }
    };

    const handleEditInfo = () => {
        if (localStorage.getItem("userRole") === "Admin"||"NhanVien") {
            navigate(`/update/${id}`);
        }
        if (localStorage.getItem("userRole") === "KhachHang") {
            navigate(`/update-info-user/${id}`);
        }

    };
    const handleHistoryBooking = () => {
        navigate('/historybooking');
    }
    const handleBill = () => {
        navigate('/bill');
    }

    return (
        <div className="admin-container">
            <div className="admin-header">
                <div className="admin-details">
                    <h2>
                        UserName: {adminInfo.userRole === "KhachHang" ? adminInfo.userName : adminInfo.fullName}
                    </h2>
                    <p>Mã: {adminInfo.userID}</p>
                    <p>Role: {adminInfo.userRole}</p>
                    <button onClick={handleEditInfo} className="edit-button">Chỉnh sửa</button>
                    {adminInfo.role === "KhachHang" &&
                        <button onClick={() => navigate(`/details-user/${adminInfo.userID}`)}
                                className="edit-button">Chi tiết thông tin</button>}
                </div>
            </div>
            {adminInfo.userRole === "Admin" && (
                <div className="admin-actions">
                    <h3>Quản lý hồ sơ</h3>
                    <ul>
                        <li><a href="/list-employee">Danh sách nhân viên</a></li>
                        <li><a href="/list-user">Danh sách khách hàng</a></li>
                        <li></li>
                    </ul>
                </div>
            )}
            {adminInfo.userRole === "NhanVien" && (
                <div className="admin-actions">
                    <h3>Quản lý hồ sơ</h3>
                    <ul>
                        <li><a href="/list-user">Danh sách khách hàng</a></li>
                    </ul>
                </div>
            )}
            {adminInfo.userRole === "KhachHang" && (<div className="payment-section">
                <h3>Quản lý thanh toán phòng</h3>
                <button onClick={handleHistoryBooking} className="payment-button">Xem lịch sử đặt phòng</button>
            </div>)}
            {adminInfo.userRole !== "KhachHang" && (<div className="payment-section">
                <h3>Quản lý thanh toán phòng</h3>
                <button onClick={handleHistoryBooking} className="payment-button">Xem lịch sử đặt phòng</button>
                <button onClick={handleBill} className="payment-button">Xem hóa đơn</button>
            </div>)}
            <button onClick={handleLogout} className="logout-button">Đăng Xuất</button>
        </div>
    );
}