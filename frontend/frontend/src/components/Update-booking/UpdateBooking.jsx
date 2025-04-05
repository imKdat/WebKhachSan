import {useState, useEffect} from 'react';
import axios from 'axios';
import {useNavigate, useParams} from 'react-router-dom';
import "./UpdateBooking.css";

const UpdateBooking = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const [booking, setBooking] = useState({
        DatPhongID: '',
        KhachHangID: '',
        RoomID: '',
        CheckInDate: '',
        CheckOutDate: '',
        NumberOfGuests: 1,
        TotalAmount: 0,
        Status: 'Đã xác nhận'
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:5000/datphong/${id}`,{withCredentials: true})
            .then(res => {
                const bookingData = res.data[0] || res.data; // Xử lý cả 2 trường hợp dữ liệu trả về
                console.log("Raw API data:", bookingData);

                const formattedBooking = {
                    ...bookingData,
                    CheckInDate: bookingData.CheckInDate ?
                        new Date(bookingData.CheckInDate).toISOString().split('T')[0] : '',
                    CheckOutDate: bookingData.CheckOutDate ?
                        new Date(bookingData.CheckOutDate).toISOString().split('T')[0] : ''
                };

                console.log("Formatted booking data:", formattedBooking);
                setBooking(formattedBooking);
                setLoading(false);
            })
            .catch(err => {
                console.error("Fetch error:", err);
                setError(err.message);
                setLoading(false);
            });
    }, [id]);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setBooking(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Prepare data for submission matching API structure
        const requestData = {
            datPhongid: booking.DatPhongID,
            khachHangid: booking.KhachHangID,
            roomid: booking.RoomID,
            checkindate: booking.CheckInDate,
            checkoutdate: booking.CheckOutDate,
            numberofguests: parseInt(booking.NumberOfGuests),
            status: booking.Status,
        };

        try {
            await axios.put(`http://localhost:5000/datphong/update/${id}`, requestData,{withCredentials: true});
            alert('Cập nhật đặt phòng thành công!');
            navigate('/historyBooking');
        } catch (err) {
            console.error('Error updating booking:', err);
            alert(`Cập nhật đặt phòng thất bại! ${err.response?.data?.message || ''}`);
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="update-booking-container">
            <h2>Cập nhật thông tin đặt phòng</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Mã Đặt Phòng:</label>
                    <input
                        type="text"
                        value={booking.DatPhongID}
                        readOnly
                    />
                </div>

                <div className="form-group">
                    <label>Mã Khách Hàng:</label>
                    <input
                        type="text"
                        value={booking.KhachHangID}
                        readOnly
                    />
                </div>

                <div className="form-group">
                    <label>Mã Phòng:</label>
                    <input
                        type="text"
                        value={booking.RoomID}
                        readOnly
                    />
                </div>

                <div className="form-group">
                    <label>Ngày Check-in:</label>
                    <input
                        type="date"
                        name="CheckInDate"
                        value={booking.CheckInDate}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Ngày Check-out:</label>
                    <input
                        type="date"
                        name="CheckOutDate"
                        value={booking.CheckOutDate}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Số lượng người:</label>
                    <input
                        type="number"
                        name="NumberOfGuests"
                        value={booking.NumberOfGuests}
                        onChange={handleChange}
                        min="1"
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Tổng tiền (VND):</label>
                    <input
                        type="number"
                        name="TotalAmount"
                        value={booking.TotalAmount}
                        onChange={handleChange}
                        min="0"
                        step="1000"
                        required
                        disabled
                    />
                </div>

                <div className="form-group">
                    <label>Trạng thái:</label>
                    <select
                        name="Status"
                        value={booking.Status}
                        onChange={handleChange}
                        required
                        disabled
                    >
                        <option value="Đã xác nhận">Đã xác nhận</option>
                        <option value="Đã check-in">Đã check-in</option>
                        <option value="Đã trả phòng">Đã trả phòng</option>
                    </select>
                </div>

                <div className="button-group">
                    <button type="submit">Lưu thay đổi</button>
                    <button type="button" onClick={() => navigate(-1)}>
                        Hủy
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UpdateBooking;