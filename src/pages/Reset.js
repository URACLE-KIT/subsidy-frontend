import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Reset = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('id');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    const handlePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (password === confirmPassword) {
            // console.log(id, password);
            try {
                if (id) {
                    const response = await axios.post(`http://localhost:8080/auth/reset?id=${id}&newPassword=${password}`);
                    alert('비밀번호 재설정이 완료되었습니다.');
                    navigate('/required');
                } else {
                    alert("ID가 유효하지 않습니다.");
                }
            } catch (error) {
                console.error("비밀번호 재설정 오류:", error);
            }
        } else {
            alert("비밀번호가 일치하지 않습니다.");
        }
    };

    useEffect(() => {
        const accessToken = localStorage.getItem('ACCESS_TOKEN');

        if (accessToken) {
            window.location.href = "/";
            return;
        }
    }, [])

    return (
        <>
            <div className="container">
                <h3>비밀번호 재설정</h3>
                <form onSubmit={handleSubmit}>
                    <div className="password-input">
                        <label htmlFor="password">비밀번호</label>
                        <input type={showPassword ? "text" : "password"} id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <div className="password-icon" onClick={handlePasswordVisibility}>
                            {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
                        </div>
                    </div>
                    <div className="password-input">
                        <label htmlFor="confirmPassword">비밀번호 재확인</label>
                        <input type={showConfirmPassword ? "text" : "password"} id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                        <div className="password-icon" onClick={handleConfirmPasswordVisibility}>
                            {showConfirmPassword ? <MdVisibilityOff /> : <MdVisibility />}
                        </div>
                    </div>
                    <button style={{ padding: '15px', margin: '10px 0' }} type="submit">비밀번호 재설정</button>
                </form>
            </div>
        </>
    );
};

export default Reset;
