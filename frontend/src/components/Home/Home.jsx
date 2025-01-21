import './Home.css'; // Import file CSS
import { Link } from "react-router-dom";
import logo from './logo.png'; // Import logo

const Home = () => {
    return (
        <div className="home">
            <div className="hero">
                <img src={logo} alt="Logo" className="logo" />
                <h2>Chào mừng đến với Hotel Del Luna</h2>
                <p>Trải nghiệm kỳ nghỉ tuyệt vời với dịch vụ hoàn hảo và không gian sang trọng.</p>
                <Link to="/rooms">
                    <button className="btn-book-now">Đặt phòng ngay</button>
                </Link>
            </div>

            <div className="features-container">
                <section className="features">
                    <h3>Tính năng nổi bật</h3>
                    <ul>
                        <li>Wifi miễn phí</li>
                        <li>Hồ bơi ngoài trời</li>
                        <li>Nhà hàng phục vụ 24/7</li>
                        <li>Chỗ đỗ xe miễn phí</li>
                        <li>Phòng tập gym hiện đại</li>
                    </ul>
                </section>
            </div>
        </div>
    );
};

export default Home;