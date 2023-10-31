import { useState } from "react";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { Link, useLocation } from 'react-router-dom';

const Required = () => {
    const [showPassword, setShowPassword] = useState(false);

    const handlePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="container">
            <h3>로그인이 필요합니다.</h3>
            <button className="to-login">
                <Link to='/login'>로그인하기</Link>
            </button>
            <button className="to-signup">
                <Link to='/signup'>회원가입하기</Link>
            </button>
        </div>
    );
}

export default Required;
