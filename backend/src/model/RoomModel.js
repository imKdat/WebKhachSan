const pool = require('../utils/ConnectDB');

const getAllRooms = async () => {
    try {
        const query = 'select * from rooms';
        const [rows] = await pool.query(query);
        return rows;
    } catch (err) {
        console.log(err);
    }
}
const getRoomById = async (roomId) => {
    try {
        const query = 'select * from rooms where roomid=?';
        const [rows] = await pool.query(query,[roomId]);
        return rows;
    } catch (err) {
        console.log(err);
    }
}
const updateRoom = async (roomId, status) => {
    try {
        const query = 'UPDATE rooms SET status=? WHERE roomid=?';
        await pool.query(query, [status, roomId]);
    } catch (err) {
        console.log(err);
    }
}
const updateInfoRoom = async (roomId,dataRoom) => {
    try {
        const {roomnumber,roomtype,price,status,imageurl} = dataRoom;
        const query='UPDATE rooms SET ROOMNUMBER=?,ROOMTYPE=?,PRICE=?, STATUS=?,IMAGEURL=? WHERE roomid=?';
        await pool.query(query,[roomnumber,roomtype,price,status,imageurl,roomId]);
    }
    catch (err) {
        console.log(err);
    }
}
const deleteRoom = async (roomId) => {
    try {
        const query = 'DELETE FROM rooms WHERE roomid=?';
        await pool.query(query, [roomId]);
    }
    catch (err) {
        console.log(err);
    }
}
const addRoom = async (roomData) => {
    try {
        const{roomnumber,roomtype,price,status,imageurl} = roomData;
        const query = 'INSERT INTO rooms SET ROOMNUMBER=?,ROOMTYPE=?,PRICE=?,STATUS=?,IMAGEURL=? ';
        await pool.query(query,[roomnumber,roomtype,price,status,imageurl]);
    }
    catch (err) {
        console.log(err);
    }
}
module.exports = {getAllRooms,updateRoom,getRoomById,updateInfoRoom,deleteRoom,addRoom}