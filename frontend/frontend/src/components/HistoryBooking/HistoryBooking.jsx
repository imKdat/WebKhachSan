import {useState, useEffect} from 'react';
import axios from 'axios';
import "./HistoryBooking.css";
import {useNavigate} from "react-router-dom";

const HistoryBooking = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const khachhangid = localStorage.getItem("userID");
    const role = localStorage.getItem("userRole");
    const api = axios.create({
        baseURL: 'http://localhost:5000',
        withCredentials: true
    });
    useEffect(() => {
        if (role === "KhachHang") {
            axios.get(`http://localhost:5000/khachhang/hoadon/${khachhangid}`, {withCredentials: true})
                .then((res) => {
                    setBookings(res.data);
                    setLoading(false);
                })
                .catch((err) => {
                    setError(err.message);
                    setLoading(false);
                });
        } else {
            axios.get(`http://localhost:5000/datphong`, {withCredentials: true})
                .then((res) => {
                    setBookings(res.data);
                    setLoading(false);
                })
                .catch((err) => {
                    setError(err.message);
                    setLoading(false);
                });
        }
    }, [khachhangid]);

    const handleDelete = (id) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa đặt phòng này?")) {
            axios.delete(`http://localhost:5000/datphong/delete/${id}`, {withCredentials: true})
                .then(() => {
                    setBookings(bookings.filter(booking => booking.DatPhongID !== id));
                    alert("Xóa thành công!");
                })
                .catch((err) => {
                    console.error("Error deleting booking:", err);
                    alert("Xóa thất bại!");
                });
        }
    };

    const handleEdit = (id) => {
        navigate(`/update-booking/${id}`);
    };

    const handleCheckin = async (id) => {
        if (window.confirm("Bạn có chắc chắn muốn check-in cho đặt phòng này?")) {
            try {
                await axios.post(`http://localhost:5000/datphong/checkin/${id}`,{}, {withCredentials: true});
                const res = await api.get(
                    role === "KhachHang"
                        ? `/khachhang/hoadon/${khachhangid}`
                        : `/datphong`
                );
                setBookings(res.data);
                alert("Check-in thành công!");
            } catch (err) {
                console.error("Error checking in:", err);
                alert("Check-in thất bại!");
            }
        }
    };

    const handlePayment = async (id) => {
        try {
            await axios.post(`http://localhost:5000/datphong/thanhtoan/${id}`,{}, {withCredentials: true});
            const res = await api.get(
                role === "KhachHang"
                    ? `/khachhang/hoadon/${khachhangid}`
                    : `/datphong`
            );
            setBookings(res.data);
            alert("Xác nhận thanh toán thành công!");
        } catch (err) {
            console.error("Error confirming payment:", err);
            alert("Xác nhận thanh toán thất bại!");
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!bookings.length) return <p>Không có lịch sử đặt phòng</p>;

    return (
        <div className="history-booking-container">
            <h2>Lịch Sử Đặt Phòng</h2>
            <table>
                <thead>
                <tr>
                    <th>Mã Đặt</th>
                    <th>Mã Khách Hàng</th>
                    <th>Mã Phòng</th>
                    <th>Ngày Check-in</th>
                    <th>Ngày Check-out</th>
                    <th>Số Lượng Người</th>
                    <th>Giá tiền</th>
                    <th>Trạng Thái</th>
                    {(role === "Admin" || role === "NhanVien") && <th>Hành Động</th>}
                    {(role === "Admin" || role === "NhanVien") && <th>Thanh toán</th>}

                </tr>
                </thead>
                <tbody>
                {bookings.map((booking) => (
                    <tr key={booking.DatPhongID}>
                        <td>{booking.DatPhongID}</td>
                        <td>{booking.KhachHangID}</td>
                        <td>{booking.RoomID}</td>
                        <td>{new Date(booking.CheckInDate).toLocaleDateString()}</td>
                        <td>{new Date(booking.CheckOutDate).toLocaleDateString()}</td>
                        <td>{booking.NumberOfGuests}</td>
                        <td>{booking.TotalAmount}</td>
                        <td>{booking.Status}</td>
                        {(role === "Admin" || role === "NhanVien") && booking.Status === "Đã xác nhận" && (
                            <td>
                                {booking.Status !== "Đã trả phòng" && (
                                    <button onClick={() => handleEdit(booking.DatPhongID)}>Sửa</button>)}
                                {booking.Status !== "Đã trả phòng" && (
                                    <button onClick={() => handleDelete(booking.DatPhongID)}>Xóa</button>)}
                                {booking.Status === "Đã xác nhận" &&
                                    <button onClick={() => handleCheckin(booking.DatPhongID)}>Check-in</button>
                                }
                            </td>

                        )}
                        {(role === "Admin" || role === "NhanVien") && booking.Status === "Đã check-in" && <td>
                            <button onClick={() => handlePayment(booking.DatPhongID)}>Xác nhận Thanh Toán</button>
                        </td>}

                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default HistoryBooking;