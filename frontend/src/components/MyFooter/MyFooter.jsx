import './MyFooter.css'; // Import file CSS nếu cần

const MyFooter = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-column">
                    <h3>Thành Viên Nhóm</h3>
                    <p><strong>Đào Khắc Đạt</strong> - Lập trình backend & frontend</p>
                    <p><strong>Nguyễn Hoàng Phi Long</strong> - Thiết kế giao diện & lập trình frontend</p>
                    <p><strong>Trần Thị Yến</strong> - Lập trình backend</p>
                </div>
                <div className="footer-column">
                    <h3>Thông Tin Liên Hệ</h3>
                    <p><strong>Địa chỉ:</strong> 123 Đường ABC, Thành phố XYZ, Việt Nam</p>
                    <p><strong>Điện thoại:</strong> (012) 345-6789</p>
                    <p><strong>Email:</strong> contact@mywebsite.com</p>
                </div>
                <div className="footer-column">
                    <h3>Giới Thiệu</h3>
                    <p>Chào mừng bạn đến với Khách Sạn Gia Định, nơi mà sự thoải mái gặp gỡ sự sang trọng.</p>
                    <p>Đội ngũ của chúng tôi luôn sẵn sàng phục vụ bạn với dịch vụ tốt nhất.</p>
                </div>
            </div>
            <p>2025 My Website. All rights reserved.</p>
        </footer>
    );
}

export default MyFooter;