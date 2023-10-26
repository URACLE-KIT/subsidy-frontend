import { Link } from "react-router-dom";
import { FaSearch, FaBell } from 'react-icons/fa';

const Header = () => {
    return (
        <header>
            <div className="title">
                <Link to="/">제목</Link>
            </div>
            <div className="util">
                <div className="util-btn"><FaSearch /></div>
                <div className="util-btn"><FaBell /></div>
            </div>
        </header>
    );
};

export default Header;
