import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./Update.css";

// Tạo instance axios với cấu hình mặc định
const axiosInstance = axios.create({
    baseURL: "http://localhost:5000",
    withCredentials: true, // Gửi cookie và credentials với mỗi request
});

export default function Update() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [userInfo, setUserInfo] = useState({
        FullName: "",
        PhoneNumber: "",
        Email: "",
        Username: "",
        Password: "",
        Role: "Admin",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Fetch user data
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                setLoading(true);
                const response = await axiosInstance.get(`/nhanvien/${id}`,{withCredentials: true});

                setUserInfo(response.data);
            } catch (err) {
                setError(err.response?.data?.message || err.message || "Failed to fetch user data");
                console.error("Fetch error:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserInfo((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const requestData = {
            fullname: userInfo.FullName,
            phonenumber: userInfo.PhoneNumber,
            email: userInfo.Email,
            username: userInfo.Username,
            password: userInfo.Password,
            role: userInfo.Role,
        };

        try {
            await axiosInstance.put(`/nhanvien/update/${id}`, requestData,{withCredentials: true});

            alert("User updated successfully!");
            navigate("/user/admin"); // Redirect to user list after update
        } catch (err) {
            setError(err.response?.data?.message || err.message || "Update failed");
            console.error("Update error:", err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error">Error: {error}</div>;

    return (
        <div className="update-container">
            <h2>Update User Information</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Full Name:</label>
                    <input
                        type="text"
                        name="FullName"
                        value={userInfo.FullName}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Phone Number:</label>
                    <input
                        type="text"
                        name="PhoneNumber"
                        value={userInfo.PhoneNumber}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Email:</label>
                    <input
                        type="email"
                        name="Email"
                        value={userInfo.Email}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Username:</label>
                    <input
                        type="text"
                        name="Username"
                        value={userInfo.Username}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Password:</label>
                    <input
                        type="password"
                        name="Password"
                        value={userInfo.Password}
                        onChange={handleChange}
                        required
                    />
                </div>

                {localStorage.getItem("userRole") === "Admin" && (
                    <div className="form-group">
                        <label>Role:</label>
                        <select
                            name="Role"
                            value={userInfo.Role}
                            onChange={handleChange}
                            required
                        >
                            <option value="Admin">Admin</option>
                            <option value="NhanVien">Staff</option>
                        </select>
                    </div>
                )}

                {error && <div className="error-message">{error}</div>}

                <div className="button-group">
                    <button type="submit" disabled={loading}>
                        {loading ? "Updating..." : "Update User"}
                    </button>
                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        disabled={loading}
                        className="cancel-btn"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}