import { useState } from "react";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handlePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleLogin = async () => {
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        try {
            const response = await axios.post('/api/auth/signin', {
                email: email,
                password: password
            });

            M.pop.alert('로그인을 성공하였습니다.');
            M.data.storage({
                'token': response.data.token,
                'id': response.data.id,
                'name': response.data.name,
                'email': response.data.email
            })

            navigate('/');
        } catch (error) {
            M.pop.alert('가입되지 않은 이메일이거나, 비밀번호가 올바르지 않습니다.');
            console.error(error);
        }
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

            <button className="login-btn" onClick={handleLogin}>로그인</button>
        </div>
    );
}

export default Login;