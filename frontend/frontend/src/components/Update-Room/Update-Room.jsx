import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Update-Room.css";

const UpdateRoom = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [room, setRoom] = useState({
        RoomNumber: "",
        RoomType: "",
        Price: "",
        Status: "",
        ImageUrl: ""
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    // Lấy thông tin phòng cần cập nhật
    useEffect(() => {
        const fetchRoom = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/room/${id}`, {
                    withCredentials: true
                });
                setRoom(response.data.data[0]);
                setLoading(false);
            } catch (err) {
                setError(err.response?.data?.message || "Lỗi khi tải thông tin phòng");
                setLoading(false);
            }
        };

        fetchRoom();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRoom(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        const responseData={
            roomnumber: room.RoomNumber,
            roomtype: room.RoomType,
            price: room.Price,
            status: room.Status,
            imageurl: room.ImageUrl
        }
        try {
            const response = await axios.put(
                `http://localhost:5000/room/update/${id}`,
                responseData,
                { withCredentials: true }
            );

            if (response.status===200) {
                setSuccess(true);
                setTimeout(() => navigate("/rooms"), 2000);
            }
        } catch (err) {
            setError(err.response?.data?.message || "Cập nhật thất bại");
            console.error("Update error:", err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="loading">Đang tải thông tin phòng...</div>;
    if (error) return <div className="error">Lỗi: {error}</div>;

    return (
        <div className="update-room-container">
            <h2>Cập nhật thông tin phòng</h2>

            {success && (
                <div className="success-message">
                    Cập nhật thành công! Đang chuyển hướng...
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Số phòng:</label>
                    <input
                        type="text"
                        name="RoomNumber"
                        value={room.RoomNumber}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Loại phòng:</label>
                    <select
                        name="RoomType"
                        value={room.RoomType}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Chọn loại phòng</option>
                        <option value="Phòng gia đình">Gia đình</option>
                        <option value="Phòng đôi">Đôi</option>
                        <option value="Phòng đơn">Đơn</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Giá phòng (VNĐ):</label>
                    <input
                        type="number"
                        name="Price"
                        value={room.Price}
                        onChange={handleChange}
                        required
                        min="0"
                    />
                </div>

                <div className="form-group">
                    <label>Trạng thái:</label>
                    <select
                        name="Status"
                        value={room.Status}
                        onChange={handleChange}
                        required
                    >
                        <option value="Trống">Trống</option>
                        <option value="Đã đặt phòng">Đã đặt phòng</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>URL hình ảnh:</label>
                    <input
                        type="text"
                        name="ImageUrl"
                        value={room.ImageUrl}
                        onChange={handleChange}
                    />
                    {room.ImageUrl && (
                        <img
                            src={room.ImageUrl}
                            alt="Preview"
                            className="image-preview"
                        />
                    )}
                </div>

                <div className="button-group">
                    <button type="submit" disabled={loading}>
                        {loading ? "Đang cập nhật..." : "Cập nhật"}
                    </button>
                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        className="cancel-btn"
                    >
                        Hủy bỏ
                    </button>
                </div>

                {error && <div className="error-message">{error}</div>}
            </form>
        </div>
    );
};

export default UpdateRoom;