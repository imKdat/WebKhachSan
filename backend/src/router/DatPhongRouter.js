const express=require('express');
const router = express.Router();
const DatPhongController=require('../controller/DatPhongController');
const midleware = require("../midleware/midleware");
router.get('/',midleware.checkUser(["Admin","NhanVien"]),DatPhongController.getAllBooking);
router.post('/create',midleware.checkUser(["KhachHang"]),DatPhongController.create);
router.get('/:id',midleware.checkUser(["Admin","NhanVien","KhachHang"]),DatPhongController.getBookingById);
router.put('/update/:id',midleware.checkUser(["Admin","NhanVien"]),DatPhongController.updateBooking)
router.delete('/delete/:id',midleware.checkUser(["Admin","NhanVien"]),DatPhongController.deleteBooking);
router.post('/thanhtoan/:id',midleware.checkUser(["Admin","NhanVien"]),DatPhongController.addPayment);
router.post('/checkin/:id',midleware.checkUser(["Admin","NhanVien"]),DatPhongController.updateCheckInDatPhong);
module.exports = router;