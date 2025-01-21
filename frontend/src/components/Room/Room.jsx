import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Room.css'; // Import file CSS

const rooms = [
    { id: 1, name: 'Phòng 101', description: 'Phòng đơn với đầy đủ tiện nghi', price: 100, image: 'path/to/image1.jpg' },
    { id: 2, name: 'Phòng 102', description: 'Phòng đôi với view đẹp', price: 150, image: 'path/to/image2.jpg' },
    { id: 3, name: 'Phòng 103', description: 'Phòng VIP với bồn tắm riêng', price: 200, image: 'path/to/image3.jpg' },
    { id: 4, name: 'Phòng 104', description: 'Phòng gia đình rộng rãi', price: 250, image: 'path/to/image4.jpg' },
    { id: 5, name: 'Phòng 105', description: 'Phòng có bồn tắm riêng', price: 180, image: 'path/to/image5.jpg' },
    { id: 6, name: 'Phòng 106', description: 'Phòng với view biển', price: 220, image: 'path/to/image6.jpg' },
    { id: 7, name: 'Phòng 107', description: 'Phòng có ban công', price: 160, image: 'path/to/image7.jpg' },
    { id: 8, name: 'Phòng 108', description: 'Phòng có bếp nhỏ', price: 190, image: 'path/to/image8.jpg' },
    { id: 9, name: 'Phòng 109', description: 'Phòng có ghế sofa', price: 170, image: 'path/to/image9.jpg' },
    { id: 10, name: 'Phòng 110', description: 'Phòng có TV màn hình phẳng', price: 130, image: 'path/to/image10.jpg' },
];

const Room = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const roomsPerPage = 3;

    const indexOfLastRoom = currentPage * roomsPerPage;
    const indexOfFirstRoom = indexOfLastRoom - roomsPerPage;
    const currentRooms = rooms.slice(indexOfFirstRoom, indexOfLastRoom);
    const totalPages = Math.ceil(rooms.length / roomsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="container">
            <h2 className="title">Danh sách phòng</h2>
            <ul className="room-list">
                {currentRooms.map(room => (
                    <li key={room.id} className="room-item">
                        <Link to={`/rooms/${room.id}`} className="link">
                            <div className="room-details">
                                <img src={room.image} alt={room.name} className="room-image" />
                                <div>
                                    <p className="room-name">{room.name}</p>
                                    <p className="room-description">{room.description}</p>
                                    <p className="room-price">{`Giá: ${room.price} VNĐ`}</p>
                                </div>
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>

            <div className="pagination">
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => handlePageChange(index + 1)}
                        className="page-button"
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Room;