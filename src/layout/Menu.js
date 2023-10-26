import { Link } from "react-router-dom";
import { FiHome, FiFileText, FiActivity, FiBook, FiUser } from 'react-icons/fi';

const Menu = () => {
    return (
        <div className="menu">
            <Link to="/"><FiHome className="menu-icon" /><p>홈</p></Link>
            <Link to="/custom-policy"><FiFileText className="menu-icon" /><p>맞춤 정책</p></Link>
            <Link to="/local-news"><FiActivity className="menu-icon" /><p>동네 소식</p></Link>
            <Link to="/policy-news"><FiBook className="menu-icon" /><p>후기 소식</p></Link>
            <Link to="/mypage"><FiUser className="menu-icon" /><p>마이페이지</p></Link>
        </div>
    );
};

export default Menu;
