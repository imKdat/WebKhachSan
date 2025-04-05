import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Link} from "react-router-dom";
import axios from "axios";
import "./Room.css";

const RoomList = () => {
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        axios.get("http://localhost:5000/room", {withCredentials: true})
            .then((res) => {
                setRooms(res.data.data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, []);
    const handleAddRoom = () => {
        navigate("/add-room");
    };
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="room-container">
            {localStorage.getItem("userRole") === "Admin" && (
                <div className="add-room-button-container">
                    <button
                        className="add-room-button"
                        onClick={handleAddRoom}
                    >
                        + Thêm Phòng
                    </button>
                </div>
            )}
            <div className="room-list">
                {rooms.map((room) => (
                    <Link to={`/rooms/${room.RoomID}`} key={room.RoomID} className="room-card">
                        <h3 className="room-title">Phòng {room.RoomNumber}</h3>
                        <img src={room.ImageUrl} alt={`Phòng ${room.RoomNumber}`} className="room-image"/>
                        <p className="room-info"><strong>Loại:</strong> {room.RoomType}</p>
                        <p className="room-info"><strong>Giá:</strong> {parseInt(room.Price).toLocaleString()} VNĐ</p>
                        <p className="room-info">
                            <strong>Trạng Thái:</strong>
                            <span className={`room-status ${room.Status === "Trống" ? "available" : "booked"}`}>
                            {room.Status}
                        </span>
                        </p>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default RoomList;
