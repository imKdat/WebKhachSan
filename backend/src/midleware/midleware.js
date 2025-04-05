// File: middleware/authMiddleware.js
const auth = require('../utils/auth');

const checkUser = (allowedRoles) => {
    return async (req, res, next) => {
        try {
            // Bước 1: Lấy token từ cookie
            const token = req.cookies.accessToken; // Lấy token từ cookie
            if (!token) {
                return res.status(401).json("Vui lòng đăng nhập!");
            }

            // Bước 3: Giải mã token
            const decoded = auth.verifyAccessToken(token);
            console.log('decoded token', decoded);
            if (!decoded) {
                return res.status(401).json("Token không hợp lệ");
            }
            const userRole = decoded.role;
            console.log(userRole);


            // Bước 4: Kiểm tra role
            if (!allowedRoles.includes(userRole)) {
                return res.status(403).json("Bạn không có quyền truy cập");
            }

            // Bước 5: Gắn thông tin user vào request để sử dụng ở các middleware tiếp theo
            req.user = decoded;
            next();

        } catch (error) {
            console.error("Lỗi xác thực:", error);
            return res.status(500).json("Lỗi server");
        }
    };
};

module.exports = {checkUser};