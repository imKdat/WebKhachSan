import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Bill.css'; // Import file CSS

const DoanhThuPage = () => {
    const [hoaDonList, setHoaDonList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/doanhthu',{withCredentials: true});
                setHoaDonList(response.data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
    };

    if (loading) {
        return <div className="loading-state">Đang tải dữ liệu...</div>;
    }

    if (error) {
        return <div className="error-state">Lỗi: {error}</div>;
    }

    return (
        <div className="container doanh-thu-container">
            <h2 className="doanh-thu-title">Danh sách hóa đơn</h2>

            <div className="table-responsive">
                <table className="table doanh-thu-table">
                    <thead>
                    <tr>
                        <th>ID Thanh toán</th>
                        <th>ID Đặt phòng</th>
                        <th>Giá tiền</th>
                    </tr>
                    </thead>
                    <tbody>
                    {hoaDonList.map((hoaDon) => (
                        <tr key={hoaDon.thanhtoanID}>
                            <td>{hoaDon.thanhtoanID}</td>
                            <td>{hoaDon.DatphongID}</td>
                            <td>{formatCurrency(hoaDon.GiaTien)}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            <div className="tong-doanh-thu">
                <h4>Tổng doanh thu:</h4>
                <div className="tong-doanh-thu-value">
                    {formatCurrency(hoaDonList.reduce((total, hoaDon) => total + hoaDon.GiaTien, 0))}
                </div>
            </div>
        </div>
    );
};

export default DoanhThuPage;