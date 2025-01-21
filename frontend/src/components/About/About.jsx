import './About.css'; // Import file CSS nếu cần

const About = () => {
    return (
        <div className="about-container">
            <h1>Giới thiệu về Khách Sạn</h1>
            <p>
                Chào mừng bạn đến với [Tên Khách Sạn], nơi mà sự thoải mái gặp gỡ sự sang trọng.
                Đội ngũ của chúng tôi luôn sẵn sàng phục vụ bạn với dịch vụ tốt nhất.
            </p>
            <h2>Đội Ngũ Chúng Tôi</h2>
            <ul>
                <li>
                    <strong>Giám Đốc Khách Sạn:</strong> [Tên Giám Đốc] - Với hơn 15 năm kinh nghiệm trong ngành khách
                    sạn.
                </li>
                <li>
                    <strong>Quản Lý Dịch Vụ Khách Hàng:</strong> [Tên Quản Lý] - Luôn sẵn sàng lắng nghe và đáp ứng nhu
                    cầu của khách hàng.
                </li>
                <li>
                    <strong>Đầu Bếp Chính:</strong> [Tên Đầu Bếp] - Mang đến những món ăn ngon miệng và độc đáo.
                </li>
                <li>
                    <strong>Nhân Viên Lễ Tân:</strong> Đội ngũ lễ tân luôn chào đón bạn với nụ cười và sự nhiệt tình.
                </li>
            </ul>
            <h2>Tầm Nhìn và Sứ Mệnh</h2>
            <p>
                Chúng tôi không chỉ là một khách sạn; chúng tôi là một gia đình.
                Tầm nhìn của chúng tôi là trở thành điểm đến hàng đầu cho những ai tìm kiếm sự thư giãn và trải nghiệm
                tuyệt vời.
            </p>
            <h2>Kết Nối Với Chúng Tôi</h2>
            <p>
                Hãy theo dõi chúng tôi trên các mạng xã hội để cập nhật những tin tức mới nhất và các chương trình
                khuyến mãi hấp dẫn.
            </p>
            <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&pp=ygUIcmlja3JvbGw%3D">Trang chủ của chúng tôi</a>
        </div>
    );
}

export default About;