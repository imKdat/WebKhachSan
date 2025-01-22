import {Link,useNavigate} from "react-router-dom";

export default function Admin () {
    const navigate=useNavigate();

    const handleClick = () => {
        localStorage.clear();
        navigate('/');
    }
    return <div>
        <button onClick={handleClick}>Đăng Xuất</button>
    </div>
}