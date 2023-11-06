import { useState } from "react";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import emailjs from 'emailjs-com';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [inputVerificationCode, setInputVerificationCode] = useState('');
    const [showVerificationInput, setShowVerificationInput] = useState(false);
    const navigate = useNavigate();

    const checkEmailExistence = async (email) => {
        try {
            const response = await axios.get(`/checkEmail/${email}`);
            
            return response.data.exists;
        } catch (error) {
            console.error("이메일 존재 확인 오류:", error);
        }
    };    

    const sendEmailVerificationCode = async (email) => {
        const isEmailExists = await checkEmailExistence(email);

        if (isEmailExists) {
            M.pop.alert('중복된 이메일 주소입니다. 다른 이메일 주소를 사용해주세요.');
            return;
        }

        const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

        const templateParams = {
            to_email: email,
            to_name: email.split('@')[0],
            verification_code: verificationCode
        };

        emailjs.send('service_6ivehyn', 'template_alppw2q', templateParams, '3YYSEIx_1W94_6PHN')
            .then((response) => {
                M.pop.alert('인증코드를 전송했습니다. 메일함을 확인해주세요.');
                console.log('인증코드 전송 성공!', response.status, response.text);
                M.data.storage({'verificationCode': verificationCode});
                setShowVerificationInput(true);
            }, (error) => {
                console.log(error);
            });
    };

    const handlePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const handleSignup = async () => {
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirmPassword").value;
        const created_at = new Date().toISOString();
        const updated_at = "";

        if (inputVerificationCode !== M.data.storage('verificationCode')) {
            M.pop.alert("이메일 인증을 받아주세요.");
            return;
        }

        if (!name) {
            M.pop.alert("이름을 입력하세요.");
            return;
        }

        if (password !== confirmPassword) {
            M.pop.alert("비밀번호가 일치하지 않습니다.");
            return;
        }

        const userData = {
            email,
            name,
            password,
            created_at,
            updated_at
        };

        try {
            const response = await axios.post("/api/auth/signup", userData);

            alert("회원가입이 완료되었습니다.");
            M.data.removeStorage("verificationCode");
            console.log("회원가입 응답:", response.data);
            navigate('/login');
        } catch (error) {
            alert("회원가입 중 오류가 발생했습니다.");
            console.error("회원가입 오류:", error);
        }
    };

    return (
        <div className="container">
            <h3>회원가입</h3>
            <div>
                <label htmlFor="name">이름</label>
                <input type="text" id="name" />
            </div>
            <div>
                <label htmlFor="email">이메일</label>
                <br />
                <input type="text" id="email"
                    style={{
                        maxWidth: 'calc(100% - 118px)',
                        width: '240px',
                        borderRadius: '5px 0 0 5px'
                    }} />
                <button
                    style={{
                        width: '85px',
                        borderRadius: '0 5px 5px 0',
                        padding: '15px'
                    }}
                    onClick={async () => {
                        const email = document.getElementById("email").value;
                        sendEmailVerificationCode(email);
                    }}
                >
                    인증
                </button>
            </div>
            {showVerificationInput && (
                <div style={{ marginTop: '-20px' }}>
                    <input
                        style={{
                            maxWidth: 'calc(100% - 118px)',
                            width: '240px',
                            borderRadius: '5px 0 0 5px'
                        }}
                        name="inputVerificationCode"
                        required
                        id="inputVerificationCode"
                        placeholder="인증 코드 입력"
                        value={inputVerificationCode}
                        onChange={e => setInputVerificationCode(e.target.value)}
                    />
                    <button
                        style={{
                            width: '85px',
                            borderRadius: '0 5px 5px 0',
                            padding: '15px',
                            background: '#EEC3B8',
                            color: '#000'
                        }}
                        onClick={() => {
                            const storedVerificationCode = M.data.storage('verificationCode');
                            if (inputVerificationCode !== storedVerificationCode) {
                                M.pop.alert(parseInt(storedVerificationCode));
                            } else {
                                M.pop.alert("인증 코드가 확인되었습니다.");
                            }
                        }}
                    >
                        확인
                    </button>
                </div>
            )}
            <div className="password-input">
                <label htmlFor="password">비밀번호</label>
                <input type={showPassword ? "text" : "password"} id="password" />
                <div className="password-icon" onClick={handlePasswordVisibility}>
                    {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
                </div>
            </div>
            <div className="password-input">
                <label htmlFor="confirmPassword">비밀번호 재확인</label>
                <input type={showConfirmPassword ? "text" : "password"} id="confirmPassword" />
                <div className="password-icon" onClick={handleConfirmPasswordVisibility}>
                    {showConfirmPassword ? <MdVisibilityOff /> : <MdVisibility />}
                </div>
            </div>

            <button className="signup-btn" onClick={handleSignup}>회원가입</button>
        </div>
    );
}

export default Signup;
