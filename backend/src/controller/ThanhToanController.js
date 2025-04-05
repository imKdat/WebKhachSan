const ThanhToanModel = require("../model/ThanhToanModel");
 class ThanhToanController {
     async getThanhToan(req, res) {
         try {
             const thanhtoans=await ThanhToanModel.getAllThanhToan()
             return res.status(200).json(thanhtoans)
         }
         catch (error) {
             console.log(error);
             return res.status(500).json(error)
         }
     }
     async tinhTongTien(req, res) {
         try {
             const tongTien=await ThanhToanModel.tinhTongTien()
             return res.status(200).json(tongTien)
         }
         catch (error) {
             console.log(error);
             return res.status(500).json(error)
         }
     }
 }
 module.exports = new ThanhToanController();