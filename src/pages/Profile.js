import React, { useEffect, useState } from 'react';
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedId = M.data.storage('id');
    const storedName = M.data.storage('name');
    const storedEmail = M.data.storage('email');

    if (storedId) {
      setId(storedId);
    }
    if (storedName) {
      setName(storedName);
    }
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleUpdateProfile = async () => {
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (password !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      const data = {
        name: name,
        updated_at: new Date()
      };

      if (password) {
        data.password = password;
      }

      const response = await axios.patch(`/api/auth/update/${id}`, data);

      if (response.status === 200) {
        console.log(new Date());
        M.pop.alert('프로필이 업데이트되었습니다.');
        M.data.storage({'name': name});
        
        navigate('/mypage');
      }
    } catch (error) {
      M.pop.alert('프로필 업데이트에 실패했습니다.');
      console.error(error);
    }
  };

  return (
    <div className="container">
      <div className="profile-field">
        <label htmlFor="name">이름</label>
        <input
          type="text"
          id="name"
          placeholder="이름을 입력해 주세요."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="profile-field">
        <label htmlFor="email">이메일</label>
        <input
          type="text"
          id="email"
          value={email}
          disabled
        />
      </div>
      <div className="password-input">
        <label htmlFor="password">비밀번호 변경</label>
        <input
          type={showPassword ? "text" : "password"}
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="password-icon" onClick={handlePasswordVisibility}>
          {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
        </div>
      </div>
      <div className="password-input">
        <label htmlFor="password">비밀번호 변경 확인</label>
        <input
          type={showConfirmPassword ? "text" : "password"}
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <div className="password-icon" onClick={handleConfirmPasswordVisibility}>
          {showConfirmPassword ? <MdVisibilityOff /> : <MdVisibility />}
        </div>
      </div>

      <button className="modify-btn" onClick={handleUpdateProfile}>
        수정
      </button>
    </div>
  );
};

export default Profile;
