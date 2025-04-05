import {useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import axios from 'axios';
import "./Booking.css";

const Booking = () => {
    const {id} = useParams();
    const [checkinDate, setCheckinDate] = useState('');
    const [checkoutDate, setCheckoutDate] = useState('');
    const [numPeople, setNumPeople] = useState(1);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleBooking = async (e) => {
        e.preventDefault();
        e.preventDefault();

        // Lấy ngày hiện tại (không bao gồm thời gian)
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // Chuyển đổi checkinDate và checkoutDate thành đối tượng Date
        const checkin = new Date(checkinDate);
        const checkout = new Date(checkoutDate);

        // Kiểm tra ngày checkin không được nhỏ hơn ngày hiện tại
        if (checkin < today) {
            setError("Ngày check-in không được nhỏ hơn ngày hiện tại!");
            return;
        }

        // Kiểm tra ngày checkout phải lớn hơn ngày checkin
        if (checkout <= checkin) {
            setError("Ngày check-out phải lớn hơn ngày check-in!");
            return;
        }
        try {
            const response = await axios.post("http://localhost:5000/datphong/create", {
                checkindate: checkinDate,
                checkoutdate: checkoutDate,
                numberofguests: numPeople,
                khachhangid: localStorage.getItem("userID"),
                roomid: parseInt(id)
            },{withCredentials: true});

            if (response.status === 201) {
                alert("Đặt phòng thành công!");
                navigate('/historybooking');
            }
        } catch (err) {
            setError(err.response?.data || "Đặt phòng thất bại!");
        }
    };

    return (
        <div className="booking-container">
            <h2>Đặt Phòng</h2>
            {error && <div className="error">{error}</div>}
            <form onSubmit={handleBooking}>
                <div>
                    <label>Ngày Check-in:</label>
                    <input
                        type="date"
                        value={checkinDate}
                        onChange={(e) => setCheckinDate(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Ngày Check-out:</label>
                    <input
                        type="date"
                        value={checkoutDate}
                        onChange={(e) => setCheckoutDate(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Số Lượng Người:</label>
                    <input
                        type="number"
                        value={numPeople}
                        onChange={(e) => setNumPeople(e.target.value)}
                        min="1"
                        required
                    />
                </div>
                <button type="submit">Đặt Phòng</button>
            </form>
        </div>
    );
};

export default Booking;
