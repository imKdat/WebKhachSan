const NhanVienModel = require('../model/NhanVienModel');
const bcrypt = require('bcrypt');
const auth = require("../utils/auth");

class NhanVienController {
    async create(req, res) {
        try {
            const newNhanVien = req.body;
            console.log(newNhanVien);
            const nhanVien = NhanVienModel.getUserByName(newNhanVien.username);
            if (nhanVien.length > 0) {
                return res.status(500).json("NhanVien already exists");
            }
            newNhanVien.password = await bcrypt.hash(newNhanVien.password, 10);
            await NhanVienModel.createUser(newNhanVien);
            res.status(200).json("User created");
        } catch (err) {
            console.log(err)
            return res.status(500).json(err);
        }
    }

    async update(req, res) {
        try {
            const id = parseInt(req.params.id);
            const newNhanVien = req.body;
            console.log(newNhanVien);
            newNhanVien.password = await bcrypt.hash(newNhanVien.password, 10);
            await NhanVienModel.updateUser(id, newNhanVien);
            res.status(200).json("User updated");
        } catch (err) {
            console.log(err)
            res.status(500).json(err);
        }
    }

    async delete(req, res) {
        try {
            const id = parseInt(req.params.id);
            await NhanVienModel.deleteUser(id);
            res.status(200).json("User deleted");
        } catch (err) {
            console.log(err)
            res.status(500).json(err);
        }
    }

    async getAllNhanViens(req, res) {
        try {
            const nhanViens = await NhanVienModel.getAllNhanVien()
            res.status(200).json(nhanViens);
        } catch (err) {
            console.log(err)
            res.status(500).json(err);
        }
    }

    async login(req, res) {
        try {
            const user = req.body;
            const olduser = await NhanVienModel.getUserByName(user.username);
            console.log(olduser);
            console.log(user);
            if (olduser.length === 0) {
                return res.status(401).json("User not found");
            }
            const isMatch = await bcrypt.compare(user.password, olduser[0].Password);
            if (!isMatch) {
                return res.status(401).json("Password is not match");
            }
            const userToken = {id: olduser[0].NhanVienID,fullname: olduser[0].FullName, role: olduser[0].Role, username: olduser[0].Username};
            console.log(userToken);
            const accessToken = await auth.generateAccessToken(userToken);
            console.log(accessToken);
            res.cookie("accessToken", accessToken, {httpOnly: true,secure:true});
            res.status(200).json({id: olduser[0].NhanVienID,fullname: olduser[0].FullName,role: olduser[0].Role, username: olduser[0].Username});
        } catch (err) {
            console.log(err)
            res.status(500).json("login failed");
        }
    }

    async logout(req, res) {
        try {
            // Xóa cookie accessToken
            res.clearCookie("accessToken", {path: "/"});
            res.status(200).json("Logout successfully");
        } catch (err) {
            console.log(err);
            res.status(500).json("Logout failed");
        }
    }
    async getNhanVienById(req, res) {
        try {
            const id = parseInt(req.params.id);
            const [row]=await  NhanVienModel.getNhanVienById(id)
            res.status(200).json(row);
        }
        catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    }
}

module.exports = new NhanVienController;