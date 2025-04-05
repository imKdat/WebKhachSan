const RoomModel = require("../model/RoomModel");

class RoomController {
    async getAllRoom(req, res) {
        try {
            const rooms = await RoomModel.getAllRooms();
            res.status(200).json({data:rooms});
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }

    async getRoomById(req, res) {
        try {
            const id = parseInt(req.params.id);
            const room = await RoomModel.getRoomById(id)
            res.status(200).json({data:room});
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }

    async updateRoom(req, res) {
        try {
            const id = parseInt(req.params.id);
            const room = await RoomModel.getRoomById(id);
            if (room.length === 0) {
                res.status(404).json("Room Not Found");
            }
            const dataRoom = req.body;
            console.log(dataRoom);
            await RoomModel.updateInfoRoom(id, dataRoom);
            res.status(200).json("Room Updated Successfully");
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }

    async deleteRoom(req, res) {
        try {
            const id = parseInt(req.params.id);
            const room = await RoomModel.getRoomById(id);
            if (room.length === 0) {
                res.status(404).json("Room Not Found");
            }
            await RoomModel.deleteRoom(id);
            res.status(200).json("Room Deleted");
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }

    async addRoom(req, res) {
        try {
            const room = req.body;
            console.log(room);
            await RoomModel.addRoom(room);
            res.status(200).json("Add new room successfully");
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }
}

module.exports = new RoomController;