import { useState } from "react";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);

    const handlePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="container">
            <h3>로그인</h3>
            <div>
                <label htmlFor="email">이메일</label>
                <input type="text" id="email" />
            </div>
            <div className="password-input">
                <label htmlFor="password">비밀번호</label>
                <input type={showPassword ? "text" : "password"} id="password" />
                <div className="password-icon" onClick={handlePasswordVisibility}>
                    {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
                </div>
            </div>

            <button className="login-btn">로그인</button>
        </div>
    );
}

export default Login;
