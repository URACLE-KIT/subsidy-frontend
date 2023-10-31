import { useState } from "react";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";

const Signup = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handlePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    return (
        <div className="container">
            <h3>회원가입</h3>
            <div>
                <label htmlFor="nickname">닉네임</label>
                <input type="text" id="nickname" />
            </div>
            <div>
                <label htmlFor="email">이메일</label>
                <input type="text" id="email" />
            </div>
            <div>
                <label htmlFor="contact">연락처</label>
                <input type="text" id="contact" />
            </div>
            <div className="password-input">
                <label htmlFor="password">비밀번호</label>
                <input type={showPassword ? "text" : "password"} id="password" />
                <div className="password-icon" onClick={handlePasswordVisibility}>
                    {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
                </div>
            </div>
            <div className="password-input">
                <label htmlFor="password">비밀번호 재확인</label>
                <input type={showConfirmPassword ? "text" : "password"} id="password" />
                <div className="password-icon" onClick={handleConfirmPasswordVisibility}>
                    {showConfirmPassword ? <MdVisibilityOff /> : <MdVisibility />}
                </div>
            </div>

            <button className="signup-btn">회원가입</button>
        </div>
    );
}

export default Signup;
