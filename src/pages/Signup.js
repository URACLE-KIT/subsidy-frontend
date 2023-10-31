import { useState } from "react";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import emailjs from 'emailjs-com';

const Signup = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [inputVerificationCode, setInputVerificationCode] = useState('');
    const [showVerificationInput, setShowVerificationInput] = useState(false);

    const sendEmailVerificationCode = (email) => {
        const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

        const templateParams = {
            to_email: email,
            to_name: email.split('@')[0],
            verification_code: verificationCode
        };

        emailjs.send('service_6ivehyn', 'template_alppw2q', templateParams, '3YYSEIx_1W94_6PHN')
            .then((response) => {
                alert('인증코드를 전송했습니다. 메일함을 확인해주세요.');
                console.log('인증코드 전송 성공!', response.status, response.text);
                localStorage.setItem('verificationCode', verificationCode);
                setShowVerificationInput(true);
            }, (error) => {
                console.log('Failed...', error);
            });
    };

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
                            borderRadius: 0,
                            borderRadius: '0 5px 5px 0',
                            padding: '15px',
                            background: '#EEC3B8',
                            color: '#000'
                        }}
                        onClick={() => {
                            const storedVerificationCode = localStorage.getItem('verificationCode');
                            if (inputVerificationCode !== storedVerificationCode) {
                                alert("인증 코드가 일치하지 않습니다.");
                            } else {
                                alert("인증 코드가 확인되었습니다.");
                            }
                        }}
                    >
                        확인
                    </button>
                </div>
            )}
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
