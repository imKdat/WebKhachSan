import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './Details-User.css';

const CustomerDetail = () => {
    const { id } = useParams();
    const [customer, setCustomer] = useState({});
    const [bookings, setBookings] = useState([]); // Tách state bookings riêng
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                // Fetch thông tin khách hàng
                const customerRes = await axios.get(`http://localhost:5000/khachhang/${id}`,{withCredentials: true});
                setCustomer(customerRes.data[0]);

                // Fetch lịch sử đặt phòng (từ API riêng)
                const bookingsRes = await axios.get(`http://localhost:5000/khachhang/hoadon/${id}`,{withCredentials: true});
                setBookings(bookingsRes.data);

                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    if (loading) return <div className="loading">Đang tải...</div>;
    if (error) return <div className="error">Lỗi: {error}</div>;
    if (!customer) return <div className="no-data">Không tìm thấy thông tin khách hàng</div>;

    return (
        <div className="customer-detail-container">
            <div className="customer-header">
                <h2>Thông tin chi tiết khách hàng</h2>
                <div className="action-buttons">
                    <button
                        onClick={() => navigate(-1)}
                        className="back-button"
                    >
                        Quay lại
                    </button>
                </div>
            </div>

            <div className="customer-info-section">
                <div className="customer-info-card">
                    <h3>Thông tin cơ bản</h3>
                    <div className="info-grid">
                        <div className="info-item">
                            <span className="info-label">Mã khách hàng:</span>
                            <span className="info-value">{customer.KhachHangID}</span>
                        </div>
                        <div className="info-item">
                            <span className="info-label">Họ tên:</span>
                            <span className="info-value">{customer.FullName}</span>
                        </div>
                        <div className="info-item">
                            <span className="info-label">Email:</span>
                            <span className="info-value">{customer.Email}</span>
                        </div>
                        <div className="info-item">
                            <span className="info-label">Số điện thoại:</span>
                            <span className="info-value">{customer.PhoneNumber}</span>
                        </div>
                        <div className="info-item">
                            <span className="info-label">Tên đăng nhập:</span>
                            <span className="info-value">{customer.Username}</span>
                        </div>
                    </div>
                </div>

                <div className="customer-info-card">
                    <h3>Lịch sử đặt phòng</h3>
                    {bookings.length > 0 ? (  // Sử dụng state bookings thay vì customer.Bookings
                        <div className="booking-list">
                            {bookings.map(booking => (
                                <div key={booking.DatPhongID} className="booking-item">
                                    <div>
                                        <span className="booking-label">Mã đặt:</span>
                                        <span>{booking.DatPhongID}</span>
                                    </div>
                                    <div>
                                        <span className="booking-label">Phòng:</span>
                                        <span>{booking.RoomID}</span>
                                    </div>
                                    <div>
                                        <span className="booking-label">Ngày nhận:</span>
                                        <span>{new Date(booking.CheckInDate).toLocaleDateString()}</span>
                                    </div>
                                    <div>
                                        <span className="booking-label">Ngày trả:</span>
                                        <span>{new Date(booking.CheckOutDate).toLocaleDateString()}</span>
                                    </div>
                                    <div>
                                        <span className="booking-label">Trạng thái:</span>
                                        <span className={`status ${booking.Status.replace(/\s+/g, '-').toLowerCase()}`}>
                                            {booking.Status}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="no-booking">Khách hàng chưa có lịch sử đặt phòng</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CustomerDetail;