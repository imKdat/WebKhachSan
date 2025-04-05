const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const port = 5000 || process.env.PORT;
const app = express();
app.use(cors({
    origin: 'http://localhost:5173',// Cho phép frontend React truy cập
    credentials: true,
}));
const morgan = require('morgan');
app.use(morgan('combined'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());

const nhanVienRouter = require('./src/router/NhanVienRouter');
const khachHangRouter = require('./src/router/KhachHangRouter');
const datphongRouter = require('./src/router/DatphongRouter');
const roomRouter = require('./src/router/RoomRouter');
const thanhtoanRouter = require('./src/router/ThanhToanRouter');
app.use('/khachhang', khachHangRouter)
app.use('/nhanvien', nhanVienRouter)
app.use('/datphong', datphongRouter)
app.use('/room', roomRouter);
app.use('/doanhthu', thanhtoanRouter);

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});