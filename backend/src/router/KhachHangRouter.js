const express = require('express');
const router = express.Router();
const KhacHangController = require('../controller/KhachHangController');
const DatPhongController = require('../controller/DatPhongController');
const midleware = require("../midleware/midleware");
router.get("/", midleware.checkUser(["Admin", "NhanVien"]), KhacHangController.getAllUsers);
router.post('/create', midleware.checkUser(["KhachHang"]),KhacHangController.createUser)
router.put('/update/:id', midleware.checkUser(["Admin","KhachHang"]),KhacHangController.updateUser)
router.delete('/delete/:id', midleware.checkUser(["Admin"]),KhacHangController.deleteUser)
router.post('/login',KhacHangController.login)
router.get('/logout',KhacHangController.logout)
router.get("/hoadon/:id", midleware.checkUser(["Admin","NhanVien","KhachHang"]),DatPhongController.getBookingByIdKhachHang)
router.get('/:id',midleware.checkUser(["Admin","NhanVien","KhachHang"]),KhacHangController.getKhachHang)

module.exports = router;