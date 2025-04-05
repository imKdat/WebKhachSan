const express = require('express');
const router = express.Router();
const ThanhToanController = require('../controller/ThanhToanController');
const midleware = require("../midleware/midleware");
router.get('/',midleware.checkUser(["Admin","NhanVien"]),ThanhToanController.getThanhToan);
router.get('/tongTien', midleware.checkUser(["Admin"]),ThanhToanController.tinhTongTien);

module.exports = router;