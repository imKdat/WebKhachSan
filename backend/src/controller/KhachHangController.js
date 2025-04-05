const bcrypt = require('bcrypt');
const KhachHangModel = require('../model/KhachHangModel');
const auth = require('../utils/auth');
const {verifyAccessToken} = require("../utils/auth");

class KhachHangController {
    async createUser(req, res) {
        try {
            const newuser = req.body;
            const user = await KhachHangModel.getKhachHangByName(newuser.username); // Sử dụng await để chờ kết quả

            if (user.length > 0) {
                return res.status(401).json("User  already exists");
            }

            newuser.password = bcrypt.hash(newuser.password, 10);
            await KhachHangModel.addKhachHang(newuser);
            return res.status(200).json("User  created successfully");
        } catch (err) {
            console.log(err);
            res.status(500).json("User  created failed");
        }
    }

    async getAllUsers(req, res) {
        try {
            const users = await KhachHangModel.getAllKhachHang();
            res.status(200).json(users);
        } catch (err) {
            console.log(err);
            res.status(500).json("Get all user failed");
        }
    }

    async login(req, res) {
        try {
            const newuser = req.body;
            const user = await KhachHangModel.getKhachHangByName(newuser.username); // Sử dụng await để chờ kết quả
            console.log(newuser);
            console.log(user);
            if (user.length === 0) {
                return res.status(401).json("Username is not matched");
            }

            const isMatch = await bcrypt.compare(newuser.password, user[0].Password); // So sánh mật khẩu nhập vào với mật khẩu đã mã hóa
            if (!isMatch) {
                return res.status(401).json("Username or password is incorrect");
            }

            const userToken = {username: newuser.username,role:'KhachHang',id:user[0].KhachHangID}; // Chỉ cần username cho token
            const accessToken = auth.generateAccessToken(userToken);
            console.log(auth.verifyAccessToken(accessToken));
            res.cookie("accessToken", accessToken, {httpOnly: true});
            res.status(200).json({message:"Login Successfully",token:accessToken,username: newuser.username,role:'KhachHang',id:user[0].KhachHangID});
        } catch (err) {
            console.log(err);
            res.status(500).json("Login failed");
        }
    }

    async logout(req, res) {
        try {
            // Xóa cookie accessToken
            res.clearCookie("accessToken",{path: "/"});
            res.status(200).json("Logout successfully");
        } catch (err) {
            console.log(err);
            res.status(500).json("Logout failed");
        }
    }

    async updateUser(req, res) {
        try {
            const id = parseInt(req.params.id);
            const khachhang=await KhachHangModel.getKhachHangById(id);
            if (khachhang.length === 0) {
                return res.status(401).json("User not found");
            }
            const updatedData = req.body;
            updatedData.password=await bcrypt.hash(updatedData.password, 10);
            await KhachHangModel.updateKhachHang(id, updatedData)
            return res.status(200).json("User  updated successfully");
        } catch (err) {
            console.log(err);
            res.status(500).json("Update user failed");
        }
    }

    async deleteUser(req, res) {
        try {
            const id = parseInt(req.params.id);
            const user=await KhachHangModel.getKhachHangById(id);
            if (user.length === 0) {
                return res.status(401).json("User not exited");
            }
            await KhachHangModel.deleteKhachHang(id)
            return res.status(200).json("User  deleted successfully");
        } catch (err) {
            console.log(err);
            res.status(500).json("Delete user failed");
        }
    }
    async getKhachHang(req, res) {
        try {
            const id = parseInt(req.params.id);
            const user = await KhachHangModel.getKhachHangById(id);
            if (user.length === 0) {
                return res.status(401).json("User not found");
            }
            return res.status(200).json(user);
        }
        catch (err) {
            console.log(err);
            res.status(500).json("Getting user failed");
        }
    }
}

module.exports = new KhachHangController();