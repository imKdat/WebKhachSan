const express = require("express");
const router = express.Router();
const NhanVienController = require("../controller/NhanVienController");
const midleware = require("../midleware/midleware");

router.get("/",midleware.checkUser(["Admin"]),NhanVienController.getAllNhanViens)
router.post('/create',midleware.checkUser(["Admin"]),NhanVienController.create);
router.put('/update/:id',midleware.checkUser(["Admin","NhanVien"]),NhanVienController.update);
router.delete('/delete/:id',midleware.checkUser(["Admin"]),NhanVienController.delete);
router.post('/login',NhanVienController.login);
router.get('/logout',NhanVienController.logout);
router.get("/:id",midleware.checkUser(["Admin","NhanVien"]),NhanVienController.getNhanVienById)
module.exports = router;
