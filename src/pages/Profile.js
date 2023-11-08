import React, { useEffect, useState } from 'react';
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const [birthday, setBirthday] = useState({
    year: "2023",
    month: "01",
    day: "01",
  });

  useEffect(() => {
    const storedId = M.data.storage('id');
    const storedName = M.data.storage('name');
    const storedEmail = M.data.storage('email');
    const storedGender = M.data.storage('gender');
    const storedBirthday = M.data.storage('birthday');

    if (storedId) {
      setId(storedId);
    }
    if (storedName) {
      setName(storedName);
    }
    if (storedEmail) {
      setEmail(storedEmail);
    }
    if (storedGender) {
      setGender(storedGender);
    }
    if (storedBirthday) {
      const [year, month, day] = storedBirthday.split('-');
      setBirthday({ year, month, day });
    }
  }, []);

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleUpdateProfile = async () => {
    const passwordInput = document.getElementById("password");
    const confirmPasswordInput = document.getElementById("confirmPassword");

    const updatedName = document.getElementById("name").value;

    if (passwordInput.value !== confirmPasswordInput.value) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      const data = {
        updated_at: new Date()
      };

      if (updatedName) {
        data.name = updatedName;
      }

      const updatedBirthday = `${birthday.year}-${birthday.month}-${birthday.day}`;
      if (updatedBirthday) {
        data.birthday = updatedBirthday;
      }

      if (passwordInput.value) {
        data.password = passwordInput.value;
      }

      const response = await axios.patch(`/v1/users/update?id=${id}`, data);

      if (response.status === 200) {
        console.log(new Date());
        M.pop.alert('프로필이 업데이트되었습니다.');
        M.data.storage({ 'name': updatedName });
        M.data.storage({ 'birthday': updatedBirthday });

        navigate('/mypage');
      }
    } catch (error) {
      M.pop.alert('프로필 업데이트에 실패했습니다.');
      console.error(error);
    }
  };

  const handleYearChange = (e) => {
    setBirthday({ ...birthday, year: e.target.value });
  };

  const handleMonthChange = (e) => {
    setBirthday({ ...birthday, month: e.target.value });
  };

  const handleDayChange = (e) => {
    setBirthday({ ...birthday, day: e.target.value });
  };

  const yearOptions = [];
  for (let i = 2023; i >= 1900; i--) {
    yearOptions.push(i.toString());
  }

  const monthOptions = [];
  for (let i = 1; i <= 12; i++) {
    const monthString = i < 10 ? "0" + i : i.toString();
    monthOptions.push(monthString);
  }

  const dayOptions = [];
  for (let i = 1; i <= 31; i++) {
    const dayString = i < 10 ? "0" + i : i.toString();
    dayOptions.push(dayString);
  }

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
        <label htmlFor="gender">성별</label>
        <input
          type="text"
          id="gender"
          value={gender}
          disabled
        />
      </div>
      <div className="profile-field">
        <label htmlFor="birth">생년월일</label>
        <div className='birthday'>
          <select value={birthday.year} onChange={handleYearChange}>
            {yearOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          &nbsp;년&nbsp;&nbsp;&nbsp;
          <select value={birthday.month} onChange={handleMonthChange}>
            {monthOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          &nbsp;월&nbsp;&nbsp;&nbsp;
          <select value={birthday.day} onChange={handleDayChange}>
            {dayOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          일
        </div>
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
