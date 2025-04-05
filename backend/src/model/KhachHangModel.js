const pool = require("../utils/ConnectDB")

const getAllKhachHang = async () => {
    try {
        const query = "Select * from KHACHHANG";
        const [rows] = await pool.query(query);
        return rows;
    } catch (err) {
        console.log(err);
    }
}
const getKhachHangByID = async (id) => {
    try {
        const query = "Select * from KHACHHANG where ID = ?";
        const [rows] = await pool.query(query,[id]);
        return rows;
    } catch (err) {
        console.log(err);
    }
}
const addKhachHang = async (khachHang) => {
    try {
        const {fullname, phonenumber, email, idcard, username, password} = khachHang;
        const query = "INSERT INTO KHACHHANG (FULLNAME,PHONENUMBER,EMAIL,IDCARD,USERNAME,PASSWORD) VALUES (?,?,?,?,?,?)";
        await pool.query(query, [fullname, phonenumber, email, idcard, username, password])
    } catch (err) {
        console.log(err);
    }
}
const deleteKhachHang = async (id) => {
    try {
        const query = "Delete FROM KHACHHANG WHERE KHACHHANGID=?";
        await pool.query(query, [id]);
    } catch (err) {
        console.log(err);
    }
}
const updateKhachHang = async (id, khachHang) => {
    try {
        const {fullname, phonenumber, email, idcard, password} = khachHang;
        const query = "UPDATE KHACHHANG SET FULLNAME=?,PHONENUMBER=?,EMAIL=?,IDCARD=?,PASSWORD=? WHERE KHACHHANGID=?";
        await pool.query(query, [fullname, phonenumber, email, idcard, password, id])
    } catch (err) {
        console.log(err);
    }
}
const getKhachHangByName = async (username) => {
    try {
        const query = "Select * from KHACHHANG WHERE username=?";
        const [rows] = await pool.query(query, [username]);
        return rows;
    } catch (err) {
        console.log(err);
    }
}
const getKhachHangById = async (KhachHangId) => {
    try {
        const query = "Select * from KHACHHANG WHERE KhachHangId=?";
        const [rows] = await pool.query(query, [KhachHangId]);
        return rows;
    } catch (err) {
        console.log(err);
    }
}
module.exports = {addKhachHang, deleteKhachHang, getAllKhachHang, updateKhachHang, getKhachHangByName,getKhachHangById}