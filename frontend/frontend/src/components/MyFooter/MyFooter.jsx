import './MyFooter.css'; // Import file CSS nếu cần

const MyFooter = () => {
    return (
        <footer className="footer">
    <div className="footer-content">
        <div className="footer-column">
            <h3>Về Chúng Tôi</h3>
            <p>Khách Sạn Gia Định là điểm đến lý tưởng cho những ai tìm kiếm sự tiện nghi và đẳng cấp giữa lòng TP.HCM.</p>
            <p>Chúng tôi cam kết mang đến cho quý khách trải nghiệm nghỉ dưỡng tuyệt vời và dịch vụ tận tâm nhất.</p>
        </div>
        <div className="footer-column">
            <h3>Liên Hệ</h3>
            <p><strong>Địa chỉ:</strong> 371 Nguyễn Kiệm, P.3, Q.Gò Vấp, TP.HCM</p>
            <p><strong>Điện thoại:</strong> (028) 7301 3456</p>
            <p><strong>Email:</strong> info@giadinhhotel.vn</p>
        </div>
        <div className="footer-column">
            <h3>Theo Dõi Chúng Tôi</h3>
            <p>Facebook: <a href="https://www.facebook.com/TruongDaihocGiaDinh">fb.com/giadinhhotel</a></p>
        </div>
    </div>
    <div className="footer-bottom">
        <p>&copy; 2025 Gia Định Hotel. All rights reserved.</p>
    </div>
</footer>

    );
}

export default MyFooter;
