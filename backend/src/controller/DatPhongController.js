const DatPhongModel = require('../model/DatPhongModel')
const RoomModel = require('../model/RoomModel')
class DatPhongController {
    async addPayment(req, res) {
        try{
            const id=parseInt(req.params.id);
            const result= await  DatPhongModel.addPayment(id);
            res.status(200).json(result)
        }
        catch(err){
            console.log(err);
            res.status(400).json(err);
        }
    }
    async updateCheckInDatPhong(req, res) {
        try {
            const id = parseInt(req.params.id);
            const result = await DatPhongModel.updateStatusCheckInDatPhong(id)
            res.status(200).json(result)
        }
        catch(err){
            console.log(err);
            res.status(400).json(err);
        }
    }
    async create(req, res) {
        try {
            const dataBooking = req.body;
            console.log(dataBooking.khachhangid);
            console.log(dataBooking.roomid);
            const room=await RoomModel.getRoomById(dataBooking.roomid);
            console.log(room[0].Status);
            if (room[0].Status===("Đã đặt"||"Đã đặt phòng")) {
                return res.status(500).json("Phòng đã được đặt")
            }
            await DatPhongModel.addDatPhong(dataBooking);
            res.status(201).json('Đặt phòng thành công');
        } catch (err) {
            res.status(500).send({error: err});
            console.log(err);
        }
    }

    async getAllBooking(req, res) {
        try {
            const bookings = await DatPhongModel.getAllDatPhong()
            res.status(200).json(bookings);
        } catch (err) {
            res.status(500).send({error: err});
            console.log(err);
        }
    }
    async getBookingById(req, res) {
        try {
            const id=parseInt( req.params.id);
            const booking=await DatPhongModel.getAllDatPhongById(id);
            res.status(200).json(booking);
        }
        catch (err) {
            console.log(err);
            res.status(500).send({error: err});
        }
    }
    async getBookingByIdKhachHang(req, res) {
        try {
            const id=parseInt( req.params.id);
            const booking=await DatPhongModel.getAllDatPhongByIdKhachHang(id);
            res.status(200).json(booking);
        }
        catch (err) {
            console.log(err);
            res.status(500).send({error: err});
        }
    }
    async deleteBooking(req, res) {
        try{
            const id=parseInt( req.params.id);
            const booking=await DatPhongModel.getAllDatPhongById(id);
            if(booking.length===0){
               return res.status(404).send({error: 'Booking not found'});
            }
            await DatPhongModel.deleteDatPhong(id)
            res.status(200).json('Booking deleted successfully');
        }
        catch (err) {
            res.status(500).send({error: err});
        }
    }
    async updateBooking(req, res) {
        const dataBooking=req.body;
        console.log(dataBooking);
        const id = parseInt( req.params.id);
        const booking=await DatPhongModel.getAllDatPhongById(id);
        if(booking.length===0){
            return res.status(404).send({error: 'Booking not found'});
        }
        await DatPhongModel.updateDatPhong(id,dataBooking);
        res.status(200).json('Booking updated successfully');
    }
}
module.exports = new DatPhongController;