const pool = require('../utils/ConnectDB');

// Lấy tất cả dữ liệu từ bảng DatPhong
const getAllDatPhong = async () => {
    try {
        const query = 'SELECT * FROM DatPhong';
        const [rows] = await pool.query(query);
        return rows;
    } catch (err) {
        console.error('Lỗi khi lấy tất cả đặt phòng:', err);
        throw err; // Ném lỗi lên để xử lý ở nơi gọi hàm
    }
}

// Lấy dữ liệu đặt phòng theo ID
const getAllDatPhongById = async (id) => {
    try {
        const query = 'SELECT * FROM DatPhong WHERE DATPHONGID = ?';
        const [rows] = await pool.query(query, [id]);
        return rows;
    } catch (err) {
        console.error('Lỗi khi lấy đặt phòng theo ID:', err);
        throw err; // Ném lỗi lên để xử lý ở nơi gọi hàm
    }
}
const getAllDatPhongByIdKhachHang = async (id) => {
    try {
        const query = 'SELECT * FROM DatPhong WHERE KHACHHANGID = ?';
        const [rows] = await pool.query(query, [id]);
        return rows;
    } catch (err) {
        console.error('Lỗi khi lấy đặt phòng theo ID:', err);
        throw err; // Ném lỗi lên để xử lý ở nơi gọi hàm
    }
}
// Thêm dữ liệu đặt phòng
const addDatPhong = async (dataBooking) => {
    // Lấy kết nối từ pool
    try {

        const {khachhangid, roomid, checkindate, checkoutdate, numberofguests} = dataBooking;
        const [room] = await pool.query('SELECT Price FROM Rooms WHERE RoomID = ?', [roomid]);

        const pricePerNight = room[0].Price;
        const numberOfNights = Math.ceil((new Date(checkoutdate) - new Date(checkindate)) / (1000 * 60 * 60 * 24));
        const totalAmount = numberOfNights * pricePerNight;
        const queryDatPhong = `
            INSERT INTO DatPhong (KHACHHANGID, ROOMID, CHECKINDATE, CHECKOUTDATE, NUMBEROFGUESTS, STATUS,TOTALAMOUNT)
            VALUES (?, ?, ?, ?, ?, "Đã xác nhận",?)
        `;
        await pool.query(queryDatPhong, [khachhangid, roomid, checkindate, checkoutdate, numberofguests,totalAmount]);
        const queryUpdateRoom = `
            UPDATE Rooms
            SET STATUS = ?
            WHERE ROOMID = ?
        `;
        await pool.query(queryUpdateRoom, ["Đã đặt phòng", roomid]);
        console.log('Thêm dữ liệu và cập nhật trạng thái thành công!');
    } catch (err) {
        console.error('Lỗi khi thêm dữ liệu:', err);
        throw err; // Ném lỗi lên để xử lý ở nơi gọi hàm
    }
}
const updateDatPhong = async (id, dataBooking) => {
    try {
        const {roomid, checkindate, checkoutdate, numberofguests, status} = dataBooking;
        const [room] = await pool.query('SELECT Price FROM Rooms WHERE RoomID = ?', [roomid]);

        const pricePerNight = room[0].Price;
        const numberOfNights = Math.ceil((new Date(checkoutdate) - new Date(checkindate)) / (1000 * 60 * 60 * 24));
        const totalAmount = numberOfNights * pricePerNight;
        const query = 'UPDATE DatPhong SET ROOMID=?,checkindate=?,checkoutdate=?,numberofguests=?,TOTALAMOUNT=?,status=? WHERE DATPHONGID = ?';
        await pool.query(query, [roomid, checkindate, checkoutdate, numberofguests,totalAmount, status, id]);
        let statusRoom = ''
        if (status === "Đã đặt phòng"||"Đã xác nhận") {
            statusRoom = "Đã đặt"
        }
        if (status === "Đã trả phòng") {
            statusRoom = "Trống"
        }
        const queryUpdateRoom = `
            UPDATE Rooms
            SET STATUS = ?
            WHERE ROOMID = ?
        `;
        await pool.query(queryUpdateRoom, [statusRoom, roomid]);
    } catch (err) {
        console.error("Error updating room", err);
        throw err;
    }
}
const deleteDatPhong = async (id) => {
    try {
        const [rows] = await pool.query('SELECT roomid from DatPhong WHERE DATPHONGID = ?', [id]);
        const queryUpdateRoom = 'Update Rooms SET STATUS="Trống" where ROOMID=?;';
        console.log(rows);
        await pool.query(queryUpdateRoom, [rows[0].roomid]);
        const query = 'DELETE FROM DatPhong WHERE DATPHONGID = ?';
        await pool.query(query, [id]);
    } catch (err) {
        console.log(err);
        throw err;
    }
}
const updateStatusCheckInDatPhong = async (id) => {
    try {
        const query = 'UPDATE DatPhong SET status=? WHERE DATPHONGID = ?';
        const status = "Đã check-in"
        await pool.query(query, [status, id]);
        let statusRoom = ''
        if (status === "Đã check-in") {
            statusRoom = "Đã đặt"
        }
        const [room] = await getAllDatPhongById(id);
        const idRoom = room.RoomID;
        console.log(room);
        const queryUpdateRoom = `
            UPDATE Rooms
            SET STATUS = ?
            WHERE ROOMID = ?
        `;
        await pool.query(queryUpdateRoom, [statusRoom, idRoom]);
    } catch (err) {
        console.error("Error updating room", err);
        throw err;
    }
}
const updateStatusThanhToanDatPhong = async (id) => {
    try {
        const query = 'UPDATE DatPhong SET status=? WHERE DATPHONGID = ?';
        const status = "Đã trả phòng"
        await pool.query(query, [status, id]);
        let statusRoom = ''
        if (status === "Đã trả phòng") {
            statusRoom = "Trống"
        }
        const [room] = await getAllDatPhongById(id);
        const idRoom = room.RoomID;
        console.log(room);
        const queryUpdateRoom = `
            UPDATE Rooms
            SET STATUS = ?
            WHERE ROOMID = ?
        `;
        await pool.query(queryUpdateRoom, [statusRoom, idRoom]);
    } catch (err) {
        console.error("Error updating room", err);
        throw err;
    }
}
const addPayment = async (datPhongID) => {
    try {
        // Lấy thông tin đặt phòng theo ID
        const [booking] = await getAllDatPhongById(datPhongID);
        console.log(booking);
        if (!booking || booking.length === 0) {
            return 'Đặt phòng không tồn tại';
        }
        if (booking.Status !== "Đã trả phòng") {
            // Lấy thông tin phòng theo RoomID
            console.log(booking.RoomID);
            const [room] = await pool.query('SELECT Price FROM Rooms WHERE RoomID = ?', [booking.RoomID]);
            if (!room || room.length === 0) {
                return 'Phòng không tồn tại';
            }

            // Tính toán tổng tiền
            const pricePerNight = room[0].Price;
            const numberOfNights = Math.ceil((new Date(booking.CheckOutDate) - new Date(booking.CheckInDate)) / (1000 * 60 * 60 * 24));
            const totalAmount = numberOfNights * pricePerNight;

            // Thêm vào bảng thanh toán
            const queryInsertPayment = `
                INSERT INTO Thanhtoan (DatphongID, GiaTien)
                VALUES (?, ?)
            `;
            await updateStatusThanhToanDatPhong(datPhongID);
            await pool.query(queryInsertPayment, [datPhongID, totalAmount]);
            console.log('Thêm phương thức thanh toán thành công!');
            return 'thanh toán thành công!'
        }
        return "Thanh toán thất bại"

    } catch (err) {
        console.error('Lỗi khi thêm phương thức thanh toán:', err);
        return ('Lỗi khi thêm phương thức thanh toán:', err)
        throw err; // Ném lỗi lên để xử lý ở nơi gọi hàm
    }
}
// Xuất các hàm
module.exports = {
    getAllDatPhongByIdKhachHang,
    getAllDatPhong,
    getAllDatPhongById,
    addDatPhong,
    updateDatPhong,
    deleteDatPhong,
    updateStatusThanhToanDatPhong,
    addPayment,
    updateStatusCheckInDatPhong
};