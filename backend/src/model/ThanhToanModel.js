const pool = require('../utils/ConnectDB');
const getAllThanhToan = async () => {
    try {
        const query = "SELECT * FROM ThanhToan";
        const [rows] = await pool.query(query);
        return rows;
    }
    catch (error) {
        console.log(error);
    }
}
const tinhTongTien = async () => {
    try{
        const query = "SELECT SUM(GiaTien) AS TotalAmount FROM Thanhtoan;";
        const [rows] = await pool.query(query);
        return rows;
    }
    catch (error) {
        console.log(error);
        return error;
    }
}
module.exports = {tinhTongTien, getAllThanhToan};