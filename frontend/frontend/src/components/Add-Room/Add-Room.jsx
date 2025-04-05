import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Add-Room.css"; // Tạo file CSS riêng cho trang này

const AddRoom = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        RoomNumber: "",
        RoomType: "",
        Price: "",
        ImageUrl: "",
        Status: "Trống"
    });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const role = localStorage.getItem("userRole");

    // Kiểm tra quyền admin trước khi render
    if (role !== "Admin") {
        navigate("/");
        return null;
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        // Validate form data
        if (!formData.RoomNumber || !formData.Price) {
            setError("Vui lòng điền đầy đủ thông tin bắt buộc");
            return;
        }
        const responseData={
            roomnumber: formData.RoomNumber,
            roomtype: formData.RoomType,
            price: formData.Price,
            status: formData.Status,
            imageurl: formData.ImageUrl
        }
        try {
            const response = await axios.post("http://localhost:5000/room/create", responseData, {
                withCredentials: true
            });

            if (response.status===200) {
                setSuccess("Thêm phòng thành công!");
                setTimeout(() => {
                    navigate("/rooms"); // Chuyển hướng sau khi thêm thành công
                }, 1500);
            }
        } catch (err) {
            setError(err.response?.data?.message || "Có lỗi xảy ra khi thêm phòng");
        }
    };

    return (
        <div className="add-room-container">
            <h2>Thêm Phòng Mới</h2>

            {error && <div className="alert alert-danger">{error}</div>}
            {success && <div className="alert alert-success">{success}</div>}

            <form onSubmit={handleSubmit} className="add-room-form">
                <div className="form-group">
                    <label>Số phòng <span className="required">*</span></label>
                    <input
                        type="text"
                        name="RoomNumber"
                        value={formData.RoomNumber}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Loại phòng <span className="required">*</span></label>
                    <select
                        name="RoomType"
                        value={formData.RoomType}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Chọn loại phòng</option>
                        <option value="Gia đình">Gia đình</option>
                        <option value="Đôi">Đôi</option>
                        <option value="Đơn">Đơn</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Giá phòng (VNĐ) <span className="required">*</span></label>
                    <input
                        type="number"
                        name="Price"
                        value={formData.Price}
                        onChange={handleChange}
                        min="0"
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Trạng thái:</label>
                    <select
                        name="Status"
                        value={formData.Status}
                        onChange={handleChange}
                        required
                    >
                        <option value="Trống">Trống</option>
                        <option value="Đã đặt phòng">Đã đặt phòng</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Ảnh phòng (URL)</label>
                    <input
                        type="text"
                        name="ImageUrl"
                        value={formData.ImageUrl}
                        onChange={handleChange}
                        placeholder="https://example.com/image.jpg"
                    />
                </div>


                <div className="form-actions">
                <button type="submit" className="btn-submit">Thêm Phòng</button>
                    <button
                        type="button"
                        className="btn-cancel"
                        onClick={() => navigate(-1)}
                    >
                        Hủy
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddRoom;