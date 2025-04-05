import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import "./RoomDetail.css";

const RoomDetail = () => {
    const {id} = useParams();
    const [room, setRoom] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const username = localStorage.getItem("userName");
    const role = localStorage.getItem("userRole");

    useEffect(() => {
        axios.get(`http://localhost:5000/room/${id}`, {withCredentials: true})
            .then((res) => {
                setRoom(res.data.data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, [id]);

    const handleBooking = () => {
        if (username) {
            navigate(`/booking/${id}`);
        } else {
            navigate("/login");
        }
    };

    const handleUpdate = () => {
        navigate(`/update-room/${id}`);
    };

    const handleDelete = async () => {
        if (window.confirm("Bạn có chắc chắn muốn xóa phòng này?")) {
            try {
                const response = await axios.delete(`http://localhost:5000/room/delete/${id}`, {
                    withCredentials: true
                });

                if (response.status===200) {
                    alert("Xóa phòng thành công!");
                    navigate("/rooms");
                }
            } catch (err) {
                alert(err.response?.data?.message || "Có lỗi xảy ra khi xóa phòng");
            }
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!room || room.length === 0) return <p>Không tìm thấy phòng</p>;

    return (
        <div className="room-detail">
            <h2>Chi Tiết Phòng {room[0].RoomNumber}</h2>
            <img src={room[0].ImageUrl} alt={`Phòng ${room[0].RoomNumber}`} className="room-image"/>
            <p><strong>Loại:</strong> {room[0].RoomType}</p>
            <p><strong>Giá:</strong> {room[0].Price.toLocaleString()} VNĐ</p>
            <p>
                <strong>Trạng Thái:</strong>
                <span className={`room-status ${room[0].Status === "Trống" ? "available" : "booked"}`}>
                    {room[0].Status}
                </span>
            </p>

            <div className="room-actions">
                {role !== "Admin" && room[0].Status === "Trống" && (
                    <button className="book-room" onClick={handleBooking}>
                        Đặt Phòng
                    </button>
                )}

                {role === "Admin" && (
                    <>
                        <button className="update-room" onClick={handleUpdate}>
                            Chỉnh sửa
                        </button>
                        <button className="delete-room" onClick={handleDelete}>
                            Xóa phòng
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default RoomDetail;