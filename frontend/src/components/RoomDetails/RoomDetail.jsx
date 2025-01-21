// src/components/RoomDetail.js
import { useParams } from 'react-router-dom';
import './RoomDetail.css'; // Import file CSS

let rooms;
rooms = [
    {id: 1, name: 'Phòng 101', description: 'Phòng đơn với đầy đủ tiện nghi', price: 100, image: 'path/to/image1.jpg'},
    {id: 2, name: 'Phòng 102', description: 'Phòng đôi với view đẹp', price: 150, image: 'path/to/image2.jpg'},
    {id: 3, name: 'Phòng 103', description: 'Phòng VIP với bồn tắm riêng', price: 200, image: 'path/to/image3.jpg'},
    {id: 4, name: 'Phòng 104', description: 'Phòng gia đình rộng rãi', price: 250, image: 'path/to/image4.jpg'},
    {id: 5, name: 'Phòng 105', description: 'Phòng có bồn tắm riêng', price: 180, image: 'path/to/image5.jpg'},
    {id: 6, name: 'Phòng 106', description: 'Phòng với view biển', price: 220, image: 'path/to/image6.jpg'},
    {id: 7, name: 'Phòng 107', description: 'Phòng có ban công', price: 160, image: 'path/to/image7.jpg'},
    {id: 8, name: 'Phòng 108', description: 'Phòng có bếp nhỏ', price: 190, image: 'path/to/image8.jpg'},
    {id: 9, name: 'Phòng 109', description: 'Phòng có ghế sofa', price: 170, image: 'path/to/image9.jpg'},
    {id: 10, name: 'Phòng 110', description: 'Phòng có TV màn hình phẳng', price: 130, image: 'path/to/image10.jpg'},
];

const RoomDetail = () => {
    const { id } = useParams();
    const room = rooms.find(r => r.id === parseInt(id));

    if (!room) {
        return <h2>Phòng không tồn tại</h2>;
    }

    return (
        <div className="room-detail"> {/* Thêm className cho div */}
            <h2>{room.name}</h2>
            <p>{room.description}</p>
        </div>
    );
};

export default RoomDetail;