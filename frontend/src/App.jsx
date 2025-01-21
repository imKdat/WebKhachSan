import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header/MyHeader';
import Footer from './components/MyFooter/MyFooter.jsx';
import Home from './components/Home/Home';
import About from './components/About/About';
import Room from "./components/Room/Room";
import RoomDetail from "./components/RoomDetails/RoomDetail";
import Login from './components/Login/Login';
import Register from "./components/Register/Register"
import './App.css'
function App() {
    return (
        <Router>
            <Header />
            <main>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/rooms" element={<Room/> } />
                    <Route path="/rooms/:id" element={<RoomDetail/> } />
                    <Route path="/login" element={<Login /> } />
                    <Route path="/register" element={<Register /> } />
                </Routes>
            </main>
            <Footer />
        </Router>
    );
}

export default App;