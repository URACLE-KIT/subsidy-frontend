import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FiHome, FiFileText, FiActivity, FiBook, FiUser } from 'react-icons/fi';

const Menu = () => {
    const location = useLocation();

    const isActive = (pathname) => {
        return location.pathname === pathname;
    };

    return (
        <div className="menu">
            <Link to="/" className={isActive('/') ? 'active' : ''}><FiHome className="menu-icon" /><p>홈</p></Link>
            <Link to="/custom" className={isActive('/custom') ? 'active' : ''}><FiFileText className="menu-icon" /><p>맞춤알리미</p></Link>
            <Link to="/review" className={isActive('/review') ? 'active' : ''}><FiBook className="menu-icon" /><p>후기알리미</p></Link>
            <Link to="/ranking" className={isActive('/ranking') ? 'active' : ''}><FiActivity className="menu-icon" /><p>랭킹알리미</p></Link>
            <Link to="/mypage" className={isActive('/mypage') ? 'active' : ''}><FiUser className="menu-icon" /><p>마이페이지</p></Link>
        </div>
    );
};

export default Menu;
