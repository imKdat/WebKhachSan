const RoomController = require('../controller/RoomController');
const express = require('express');
const midleware = require("../midleware/midleware");
const router = express.Router();

router.get("/",RoomController.getAllRoom)
router.get("/:id",RoomController.getRoomById);
router.put("/update/:id",midleware.checkUser(["Admin"]),RoomController.updateRoom);
router.delete("/delete/:id",midleware.checkUser(["Admin"]),RoomController.deleteRoom);
router.post('/create',midleware.checkUser(["Admin"]),RoomController.addRoom)
module.exports = router;