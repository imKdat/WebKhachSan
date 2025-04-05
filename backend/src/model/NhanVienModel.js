const pool = require('../utils/ConnectDB')

const getAllNhanVien = async () => {
    try {
        const query = 'select * from NhanVien';
        const [rows] = await pool.query(query)
        console.log(rows);
        return rows;
    } catch (error) {
        console.error(error);
    }
}
const getUserByName = async (userName) => {
    try {
        const query = 'select * from NhanVien where USERNAME=?';
        const [rows] = await pool.query(query, [userName]);
        return rows;
    } catch (error) {
        console.error(error);
    }
}
const createUser = async (newUser) => {
    try {
        const {fullname, email, phonenumber, username, password, role} = newUser;
        const query = 'Insert into  NhanVien (FULLNAME,PHONENUMBER,EMAIL,USERNAME,PASSWORD,ROLE) values (?,?,?,?,?,?)';
        await pool.query(query, [fullname, phonenumber, email, username, password, role]);
    }
    catch (error) {
        console.error(error);
    }
}
const updateUser = async (id,newUser) => {
    try{
        const {fullname, email, phonenumber, username, password, role} = newUser;
        const query = 'UPDATE NhanVien SET FULLNAME=?,PHONENUMBER=?,EMAIL=?,USERNAME=?,PASSWORD=?,ROLE=? WHERE NHANVIENID=? ;';
        await pool.query(query, [fullname, phonenumber, email, username, password, role,id]);
    }
    catch (error) {
        console.error(error);
    }
}
const deleteUser = async (id) => {
    try{
        const query = 'DELETE FROM NhanVien where NHANVIENID=?';
        await pool.query(query, [id]);
    }
    catch (error) {
        console.error(error);
    }
}
const getNhanVienById = async (id) => {
    try {
        const query = 'select * from NhanVien where NHANVIENID=?';
        const [rows] = await pool.query(query,[id])
        console.log(rows);
        return rows;
    } catch (error) {
        console.error(error);
    }
}
module.exports = {createUser,updateUser,getAllNhanVien,getUserByName,deleteUser,getNhanVienById};