import {useState, useEffect} from 'react';
import axios from 'axios';
import {useNavigate, Link} from 'react-router-dom';
import './List-User.css';

const CustomerList = () => {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const currentUserRole = localStorage.getItem("userRole");

    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                setLoading(true);
                const response = await axios.get('http://localhost:5000/khachhang', {
                    withCredentials: true
                });
                setCustomers(response.data);
                console.log([customers]);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchCustomers();
    }, []);

    const handleDelete = async (customerId) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa khách hàng này?')) {
            try {
                await axios.delete(`http://localhost:5000/khachhang/delete/${customerId}`,{withCredentials: true});
                setCustomers(customers.filter(customer => customer.KhachHangID !== customerId));
                alert('Xóa khách hàng thành công!');
            } catch (err) {
                alert('Xóa khách hàng thất bại: ' + (err.response?.data?.message || err.message));
            }
        }
    };

    if (loading) return <div className="loading">Đang tải...</div>;
    if (error) return <div className="error">Lỗi: {error}</div>;

    return (
        <div className="customer-list-container">
            <h2>Danh Sách Khách Hàng</h2>


            <div className="customer-list-table-container">
                <table className="customer-list-table">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Họ Tên</th>
                        <th>Email</th>
                        <th>SĐT</th>
                        <th>Username</th>
                        <th>Hành động</th>
                    </tr>
                    </thead>
                    <tbody>
                    {customers.length > 0 ? (
                        customers.map(customer => (
                            <tr key={customer.KhachHangID}>
                                <td>{customer.KhachHangID}</td>
                                <td>{customer.FullName}</td>
                                <td>{customer.Email}</td>
                                <td>{customer.PhoneNumber}</td>
                                <td>{customer.Username}</td>
                                <td className="action-buttons">
                                    <button
                                        onClick={() => navigate(`/details-user/${customer.KhachHangID}`)}
                                        className="view-btn"
                                    >
                                        Xem
                                    </button>
                                    {currentUserRole === 'Admin' && (
                                        <>
                                            <button
                                                onClick={() => navigate(`/update-info-user/${customer.KhachHangID}`)}
                                                className="edit-btn"
                                            >
                                                Sửa
                                            </button>
                                            <button
                                                onClick={() => handleDelete(customer.KhachHangID)}
                                                className="delete-btn"
                                            >
                                                Xóa
                                            </button>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" className="no-data">Không có khách hàng nào</td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CustomerList;