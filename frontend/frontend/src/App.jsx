import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Header from './components/Header/MyHeader';
import Footer from './components/MyFooter/MyFooter.jsx';
import Home from './components/Home/Home';
import About from './components/About/About';
import Room from "./components/Room/Room";
import RoomDetail from "./components/RoomDetails/RoomDetail";
import Login from './components/Login/Login';
import Register from "./components/Register/Register"
import Admin from "./components/Admin/Admin";
import Update from './components/Update-Info/Update.jsx';
import BookingPage from "./components/Booking/BookingPage.jsx";
import HistoryBooking from "./components/HistoryBooking/HistoryBooking.jsx";
import EmployeeList from "./components/ListEmployee/ListEmployee.jsx";
import AddEmployee from "./components/AddEmployee/AddEmployee.jsx";
import UpdateBooking from "./components/Update-booking/UpdateBooking.jsx";
import ListUser from "./components/List-User/List-User.jsx";
import DetailsUser from "./components/Details-User/Details-User.jsx";
import Bill from "./components/Bill/Bill.jsx";
import UpdateRoom from "./components/Update-Room/Update-Room.jsx";
import AddRoom from "./components/Add-Room/Add-Room.jsx";
import './App.css'
import UpdateInfoUser from "./components/Update-Info-User/Update-Info-User.jsx";



function App() {
    return (
        <Router>
            <Header/>
            <main>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/about" element={<About/>}/>
                    <Route path="/rooms" element={<Room/>}/>
                    <Route path="/rooms/:id" element={<RoomDetail/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/user/admin" element={<Admin/>}/>
                    <Route path="/update/:id" element={<Update/>}/>
                    <Route path="/booking/:id" element={<BookingPage/>}/>
                    <Route path="/historybooking" element={<HistoryBooking/>}/>
                    <Route path="list-employee" element={<EmployeeList/>}></Route>
                    <Route path="/add-employee" element={<AddEmployee/>}></Route>
                    <Route path="/update-booking/:id" element={<UpdateBooking/>}></Route>
                    <Route path="/list-user" element={<ListUser/>}></Route>
                    <Route path="/details-user/:id" element={<DetailsUser/>}></Route>
                    <Route path="/bill" element={<Bill/>}></Route>
                    <Route path="/update-room/:id" element={<UpdateRoom/>}></Route>
                    <Route path="/add-room" element={<AddRoom/>}></Route>
                    <Route path="/update-info-user/:id" element={<UpdateInfoUser/>}></Route>

                </Routes>
            </main>
            <Footer/>
        </Router>
    );
}

export default App;